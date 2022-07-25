import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../StyleSheets/Login.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, Link } from "react-router-dom";
import { storeToken, retrieveToken } from "../tokenStorage";

export default function Login() {
    var [email, setEmail] = useState("");
    var [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    var navigation = useNavigate("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5001/api/users/?email=${email.value}&password=${password.value}`);
            let res = JSON.parse(await response.text());

            console.log(res);

            if (res.error === "No Such Records") {
                setSuccess(false);
                setError("Invalid email or password combination.");
            } else if (res.error == "Email not verified.") {
                setSuccess(false);
                setError("Please verify your email address in order to use MarkyMark.");
            } else {
                setSuccess(true);
                setError("");
                let user = {
                    firstName: res.firstName,
                    lastName: res.lastName,
                    tags: res.tags,
                    id: res.userId,
                    email: email.value,
                };
                localStorage.setItem("user_data", JSON.stringify(user));
                storeToken(res.accessToken);
                console.log(res.accessToken);
                navigation("texteditor");
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
                    <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                        <Form.Control type="email" placeholder="name@example.com" ref={(c) => setEmail(c)} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" ref={(c) => setPassword(c)} />
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

                    <Button type="submit" onClick={handleSubmit} style={{ marginTop: "1em" }}>
                        Submit
                    </Button>
                </Form>

                <Link to="register" className="text-decoration-none">
                    <p style={{ marginTop: "1em" }}>Dont have an account? Create one here!</p>
                </Link>

                <Link to="forgot" className="text-decoration-none">
                    <p style={{ marginTop: "1em" }}>Forgot your password? Reset it here!</p>
                </Link>
            </Container>
        </div>
    );
}
