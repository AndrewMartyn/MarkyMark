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
    const url = 'https://marky-mark-clone.herokuapp.com/'
    var navigation = useNavigate("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        var emailRegEx = /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (email.value.match(emailRegEx)) {
            try {
                const response = await fetch(`${url}api/users/requestreset?email=${email.value}&type=password`);
                let res = JSON.parse(await response.text());

                console.log(res);

                if (res.error == "") {
                    setSuccess(true);
                    setError("Success! Check your email for further action!");
                } else if (res.error == "No Such Records") {
                    setSuccess(false);
                    setError("Invalid Email");
                } else {
                    setSuccess(false);
                    setError("Uh oh! Something went wrong...");
                }
            } catch (e) {
                console.log(e.toString());
                return;
            }
        } else {
            setSuccess(false);
            setError("Invalid email format");
        }
    };

    return (
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">Request Password Reset</h1>
                <Form onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" ref={(c) => setEmail(c)} required />
                    </FloatingLabel>

                    {success ? (
                        <div
                            style={{
                                marginTop: "1em",
                                color: "green",
                                fontSize: ".9rem",
                            }}
                        >
                            <span>{error}</span>
                        </div>
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

                    <Button type="submit" onClick={handleSubmit} style={{ marginTop: "1em" }}>
                        Submit
                    </Button>
                </Form>

                <Link to="/" className="text-decoration-none">
                    <p style={{ marginTop: "1em" }}>Remember your login? Login here!</p>
                </Link>
            </Container>
        </div>
    );
}
