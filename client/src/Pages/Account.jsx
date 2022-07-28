import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../StyleSheets/Account.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Account() {
    var userData = JSON.parse(localStorage.getItem("user_data"));
    const url = "https://marky-mark-clone.herokuapp.com/";
    let email = userData.email;
    let firstName = userData.firstName;
    let lastName = userData.lastName;
    let userId = userData.id;

    const navigate = useNavigate("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSaveChanges = async (event) => {
        event.preventDefault();

        if (firstName != null && lastName != null && firstName.value.length > 0 && lastName.value.length > 0) {
            let obj = {
                userId: userId,
                newFirstName: firstName.value,
                newLastName: lastName.value,
            };

            let json = JSON.stringify(obj);

            try {
                const response = await fetch(`${url}api/users/changename`, {
                    method: "POST",
                    body: json,
                    headers: { "Content-Type": "application/json" },
                });

                let res = JSON.parse(await response.text());

                if (res.error == "") {
                    setSuccess(true);
                    setError("Successfully saved changes!");
                } else {
                    setError("Uh oh! Something went wrong!");
                    setSuccess(false);
                }
            } catch (e) {
                console.log(e.toString());
            }
        } else {
            setError("Invalid First or Last Name");
            setSuccess(false);
        }
    };

    const handleRequestEmailReset = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`${url}api/users/requestreset?email=${email.value}&type=email`);

            let res = JSON.parse(await response.text());

            if (res.error == "") {
                setSuccess(true);
                setError("Success! Please check your email for further action.");
            } else {
                setError("Uh oh! Something went wrong!");
                setSuccess(false);
            }
        } catch (e) {
            console.log(e.toString());
        }
    };

    const handleRequestPasswordReset = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${url}api/users/requestreset?email=${email.value}&type=password`);

            console.log(email);

            let res = JSON.parse(await response.text());

            console.log(res);

            if (res.error == "") {
                setError("Success! Please check your email for further action.");
                setSuccess(true);
            } else {
                setError("Uh oh! Something went wrong!");
                setSuccess(false);
            }
        } catch (e) {
            console.log(e.toString());
        }
    };

    return (
        <>
            <div className="parent">
                <Container className="childs">
                    <Row>
                        <h1 className="text-center">Manage your Account</h1>
                        <Form className="form" onSubmit={handleSaveChanges}>
                            <Form.Group className="mb-3" controlId="firstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="username" defaultValue={firstName} placeholder="Enter Firstname" ref={(c) => (firstName = c)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="lastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="username" defaultValue={lastName} placeholder="Enter Lastname" ref={(c) => (lastName = c)} />
                            </Form.Group>
                            <Form.Group className="mb-3 flex" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" defaultValue={email} placeholder="email@email.com" ref={(c) => (email = c)} disabled />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" defaultValue="xxxxxxx" placeholder="Password" disabled />
                                <Form.Text className="text-muted">
                                    At least 6 characters long and must contain 1 uppercase and 1 number
                                    {success ? (
                                        <div
                                            style={{
                                                marginTop: "0.5em",
                                                color: "green",
                                                fontSize: ".9rem",
                                            }}
                                        >
                                            <span>{error}</span>
                                        </div>
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
                            <div className="d-flex justify-content-between">
                                <Button className="saveChanges" type="submit" onClick={handleSaveChanges}>
                                    Save Changes
                                </Button>
                                <Button className="deleteAccount" type="submit" variant="danger" onClick={handleRequestPasswordReset}>
                                    Delete Account
                                </Button>
                            </div>
                        </Form>
                    </Row>
                    <Row>
                        <Button className="buttons" type="submit" variant="secondary" onClick={handleRequestEmailReset}>
                            Request Email Reset
                        </Button>
                        <Button className="buttons" type="submit" variant="secondary" onClick={handleRequestPasswordReset}>
                            Request Password Reset
                        </Button>
                    </Row>
                </Container>
            </div>
        </>
    );
}
