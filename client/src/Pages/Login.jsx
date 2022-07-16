import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../StyleSheets/Login.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    var navigation = useNavigate("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                `http://localhost:5001/api/users/?email=${email.value}&password=${password.value}`
            );
            let res = JSON.parse(await response.text());

            if (res.error === "No Such Records") {
                setSuccess(false);
                setError("Invalid email or password combination.");
            } else {
                setSuccess(true);
                setError("");
                let user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    tags: res.tags,
                    id: res.id,
                };
                localStorage.setItem("user_data", JSON.stringify(user));
                navigation("editor");
            }
        } catch (e) {
            console.log(e.toString());
            return;
        }
    };

    return (
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">Login</h1>
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

                    <FloatingLabel
                        controlId="floatingPassword"
                        label="Password"
                    >
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            ref={(c) => setPassword(c)}
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
                        Login
                    </Button>
                </Form>

                <Link to="register" className="text-decoration-none">
                    <p style={{ marginTop: "1em" }}>
                        Dont have an account? Create one here!
                    </p>
                </Link>
            </Container>
        </div>
    );
}
