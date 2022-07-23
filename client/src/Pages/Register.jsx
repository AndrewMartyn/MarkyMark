import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../StyleSheets/Register.css";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigate = useNavigate("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        var passwordRegEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
        var emailRegEx =
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (
            password.value.match(passwordRegEx) &&
            email.value.match(emailRegEx)
        ) {
            setError("");
            let obj = {
                firstName: firstName.value,
                lastName: lastName.value,
                email: email.value,
                password: password.value,
            };
            let json = JSON.stringify(obj);

            try {
                const response = await fetch(
                    "http://localhost:5001/api/users",
                    {
                        method: "POST",
                        body: json,
                        headers: { "Content-Type": "application/json" },
                    }
                );

                let res = JSON.parse(await response.text());

                console.log(res);

                if (res.error === "User already exists") {
                    setSuccess(false);
                    setError("User already exists!");
                } else {
                    setSuccess(true);
                    setError("");
                    let user = {
                        firstName: res.firstName,
                        lastName: res.lastName,
                        email: res.email,
                        id: res.userId,
                    };

                    console.log(user);
                    localStorage.setItem("user_data", JSON.stringify(user));
                }

                navigate("/");
            } catch (e) {
                alert(e.toString());
                return;
            }
        } else {
            setError("Invalid password complexity or email format!");
        }
    };

    return (
        <div className="parent">
            <Container className="childs">
                <h1 className="text-center">MarkyMark Registration</h1>
                <Form className="form" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="registerEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            ref={(c) => setEmail(c)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter Firstname"
                            ref={(c) => setFirstName(c)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="username"
                            placeholder="Enter Lastname"
                            ref={(c) => setLastName(c)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registerPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            ref={(c) => setPassword(c)}
                        />
                        <Form.Text className="text-muted">
                            At least 6 characters long and must contain 1
                            uppercase and 1 number
                            {success ? (
                                <></>
                            ) : (
                                <div
                                    style={{
                                        marginTop: "0.5em",
                                        color: "red",
                                        fontSize: ".9rem",
                                    }}
                                >
                                    <span>{error}</span>
                                </div>
                            )}
                        </Form.Text>
                    </Form.Group>

                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        style={{ marginTop: "1em" }}
                    >
                        Register
                    </Button>
                </Form>
            </Container>
        </div>
    );
}
