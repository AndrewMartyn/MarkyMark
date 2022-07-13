import React from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../StyleSheets/SignUp.css'
import Container from "react-bootstrap/Container"
import { Link } from "react-router-dom"

export default function SignUp(){   
    return(
        <div className="parent">
            <Container className="childs">
                <h1 className="text-center">SignUp</h1>
                    <Form className="form">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="username" placeholder="Enter UserName"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" />
                            <Form.Text className="text-muted">
                                At least 6 characters long and must contain 1 uppercase and 1 number
                            </Form.Text>
                        </Form.Group>

                        <Link to='/'><Button type="submit" style={{marginTop:'1em'}}>SignUp</Button></Link>
                         
                    </Form>   
            </Container>
        </div>
    )
}