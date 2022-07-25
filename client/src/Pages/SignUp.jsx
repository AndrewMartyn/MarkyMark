import React from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import '../StyleSheets/SignUp.css'
import Container from "react-bootstrap/Container"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

export default function SignUp(){   

    var email;
    var password;
    var firstName;
    var lastName;

    const navigate = useNavigate('')
    const [warning,setWarning] = useState(false)
    const [passwarning,setPassWarning] = useState(false)

    const doSignUp = async event => {

        event.preventDefault();

        var passwordVarification = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/

        if(password.value.match(passwordVarification)){

            setPassWarning(false)
            
            let obj = {firstName:firstName.value,lastName:lastName.value,email:email.value,password:password.value};
            let js = JSON.stringify(obj);
    
            try{    
                const response = await fetch('http://localhost:5001/api/users', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
    
                let res = JSON.parse(await response.text());
    
                console.log(res)
    
                if( res.error === 'User already exists' ){
                    setWarning(true)
                }else{
                    setWarning(false)
                    let user = {firstName:res.firstName,lastName:res.lastName,email:res.email,password:res.password,id:res.userId}
                    localStorage.setItem('user_data', JSON.stringify(user));
                }
    
                // navigate('/')
            }
            catch(e){
                alert(e.toString());
                return;
            }    
        }else{
            setPassWarning(true)
        }
       
    };

    return(
        <div className="parent">
            <Container className="childs">
                <h1 className="text-center">SignUp</h1>
                    <Form className="form" onSubmit={doSignUp}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" ref={(c) => email = c} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="username" placeholder="Enter UserName" ref={(c) => firstName = c}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="username" placeholder="Enter UserName" ref={(c) => lastName = c}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" ref={(c) => password = c}/>
                            <Form.Text className="text-muted">
                                At least 6 characters long and must contain 1 uppercase and 1 number
                                {passwarning ? <div style={{marginTop:'0.5em', color:'red', fontSize:'.9rem'}}><span>The criteria of your password is wrong </span></div> : <></>}
                            </Form.Text>
                        </Form.Group>

                        {warning ? <div style={{marginTop:'0.5em', color:'red', fontSize:'.9rem'}}><span >The email is already in use</span></div> : <></>}

                        <Button type="submit" onClick={doSignUp} style={{marginTop:'1em'}}>SignUp</Button>
                    </Form>   
            </Container>
        </div>
    )
}