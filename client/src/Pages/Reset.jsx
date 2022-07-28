import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "../StyleSheets/Reset.css";
import Container from "react-bootstrap/esm/Container";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function Reset() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [confirmNewEmail, setConfirmNewEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [valid, setValid] = useState(false);

    const search = useLocation().search;
    const userId = new URLSearchParams(search).get("userId");
    const token = new URLSearchParams(search).get("token");
    const type = new URLSearchParams(search).get("type");

    var navigation = useNavigate("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "https://marky-mark-clone.herokuapp.com/";
        var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var emailRegEx = /^[a-zA-Z0-9.!#$%&*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        let obj = {
            userId: userId,
            token: token,
            type: type,
        };

        type == "password" ? (obj.newPassword = newPassword.value) : (obj.newEmail = newEmail.value);

        if (
            (type == "password" && newPassword.value.match(passwordRegEx) && newPassword.value == confirmNewPassword.value) ||
            (type == "email" && newEmail.value.match(emailRegEx) && newEmail.value == confirmNewEmail.value)
        )
            setValid(true);
        else setValid(false);

        let json = JSON.stringify(obj);

        try {
            if (valid) {
                const response = await fetch(`${url}api/users/reset`, {
                    method: "POST",
                    body: json,
                    headers: { "Content-Type": "application/json" },
                });

                let res = JSON.parse(await response.text());

                console.log(res);

                if (res.error == "Token Expired or Invalid Type" || res.error === "No Such Records") {
                    setSuccess(false);
                    setError(type == "password" ? "Password" : "Email" + " Reset Failed");
                } else {
                    setSuccess(true);
                    setError("Success! Redirecting to login page...");
                    setTimeout(() => {
                        navigation("/");
                    }, 2000);
                }
            } else {
                setSuccess(false);
                setError("Fields do not match or improper format");
            }
        } catch (e) {
            console.log(e.toString());
            return;
        }
    };

    return (
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">{type == "password" ? "Password Reset" : "Change Email Address"}</h1>
                <Form onSubmit={handleSubmit}>
                    {type == "password" ? (
                        <div>
                            <FloatingLabel controlId="floatingInput" label="New Password" className="mb-3">
                                <Form.Control type="password" placeholder="Password" ref={(c) => setNewPassword(c)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Confirm New Password">
                                <Form.Control type="password" placeholder="Password" ref={(c) => setConfirmNewPassword(c)} />
                            </FloatingLabel>
                        </div>
                    ) : (
                        <div>
                            <FloatingLabel controlId="floatingInput" label="New Email address" className="mb-3">
                                <Form.Control type="email" placeholder="name@example.com" ref={(c) => setNewEmail(c)} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingPassword" label="Confirm New Email Address">
                                <Form.Control type="email" placeholder="name@example.com" ref={(c) => setConfirmNewEmail(c)} />
                            </FloatingLabel>
                        </div>
                    )}
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
                    <p style={{ marginTop: "1em" }}>Remember your credentials? Login here!</p>
                </Link>
            </Container>
        </div>
    );
}
