import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../StyleSheets/Login.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, Link, Navigate } from "react-router-dom";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    var navigation = useNavigate("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5001/api/users/requestreset?email=${email.value}&type=password`
            );
            let res = JSON.parse(await response.text());

            console.log(res);

            if (res.error == "No Such Records") {
                setSuccess(false);
                setError("Invalid Email");
            } else {
                setSuccess(true);
                setError("");
            }
        } catch (e) {
            console.log(e.toString());
            return;
        }
        navigation("/");
    };

    return (
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">Request Password Reset</h1>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control
                            type="email"
                            placeholder="name@example.com"
                            ref={(c) => setEmail(c)}
                        />
                    </FloatingLabel>

                    {success ? (
                        <></>
                    ) : (
                        <div
                            style={{
                                marginTop: "1em",
                                color: "red",
                                fontSize: ".9rem",
                            }}
                        >
                            <span>{error}</span>
                        </div>
                    )}

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        style={{ marginTop: "1em" }}
                    >
                        Submit
                    </Button>
                </Form>

                <Link to="/" className="text-decoration-none">
                    <p style={{ marginTop: "1em" }}>
                        Remember your login? Click here to go back
                    </p>
                </Link>
            </Container>
        </div>
    );
}
