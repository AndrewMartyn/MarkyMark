import React,{useState} from "react"
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert';
import '../StyleSheets/SignIn.css'
import Container from "react-bootstrap/esm/Container"
import {useNavigate,Link} from 'react-router-dom'


export default function SignIn(){

    var email;
    var password;
    
    const [warning,setWarning] = useState(false)

    var navigation = useNavigate('')

    const doSignIn = async event => {

        event.preventDefault();

        let obj = {email:email.value,password:password.value};

        try{    
            const response = await fetch(`http://localhost:5001/api/users/?email=${obj.email}&password=${obj.password}`);
            let res = JSON.parse(await response.text());

            if( res.error === 'No Such Records'){
                setWarning(true)
                
            }else{
                setWarning(false)
                let user = {firstName:res.firstName,lastName:res.lastName,tags:res.tags,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                navigation('texteditor')
            }
        }
        catch(e){
            alert(e.toString());
            return;
        }    
    };

    return(
        <div className="parent">
            <Container className="child">
                <h1 className="text-center">Sign In</h1>
                <Form onSubmit={doSignIn}>
                    <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                    >
                        <Form.Control type="email" placeholder="name@example.com" ref={(c) => email = c} />
                    </FloatingLabel>

                    <FloatingLabel controlId="floatingPassword" label="Password">
                            <Form.Control type="password" placeholder="Password" ref={(c) => password = c}/>
                    </FloatingLabel>  

                    {warning ? <div style={{marginTop:'1em', color:'red', fontSize:'.9rem'}}><span >Either your Email or Password is wrong </span></div> : <></>}

                    <Button type="submit" onClick={doSignIn} style={{marginTop:'1em'}}>SignIn</Button>
                </Form>   

                <Link to='signup' className="text-decoration-none" ><p style={{marginTop:'1em'}}>Dont have an account? SignUp</p></Link>
                    
            </Container>
        </div>
    )
}