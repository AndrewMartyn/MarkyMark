import React,{useState} from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../StyleSheets/SignIn.css'
import { Alert } from "bootstrap"
import Container from "react-bootstrap/esm/Container"
import {Link} from 'react-router-dom'


export default function SignIn(){

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
        }

        setValidated(true);
    }

    const Warning = () => {
        if(validated){
            return(
                <p>It worked</p> 
            )
        }else{
            <Alert variant='danger'>Wrong UserName or Password</Alert>
        }
    }

    return(
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">Sign In</h1>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" />
                    </FloatingLabel>  

                    <Link to='texteditor'><Button type="submit" style={{marginTop:'1em'}}>SignIn</Button></Link>
                    <Warning/>
                </Form>   

                <Link to='signup' className="text-decoration-none" ><p style={{marginTop:'1em'}}>Dont have an account? SignUp</p></Link>
                    
            </Container>
        </div>
    )
}