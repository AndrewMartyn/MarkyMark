import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../StyleSheets/tabs.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { AiOutlineUser } from "react-icons/ai";
  
export default function Tabs(props) {

  const [show, setShow] = useState(false);
  const [fileName,setFileName] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  let userInfo = JSON.parse(window.localStorage.getItem('user_data'))

  const AddFile = async (e)=> {
    
    e.preventDefault()
    
    try{
        
        let userInfo = JSON.parse(window.localStorage.getItem('user_data'))
        
        let object = {
            name:fileName,
            body:"",
            tags: [],
        }

        let js = JSON.stringify(object)
        
        const response = await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes`,{method:'PUT',body : js,headers:{'Content-Type': 'application/json'}});

        let res = JSON.parse(await response.text())

        console.log('We did the PUT request')
        console.log(res)

        setShow(false)
    
    }
    catch(e){
        alert(e.toString())
        return
    }

    try{

      let userInfo = JSON.parse(window.localStorage.getItem('user_data'))
      
      const response = await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});

      let res = JSON.parse(await response.text())

      console.log('We did the GET request')
      console.log(res)

      let user = { fileName:res.name,body:res.body,tags:res.tags,type:'file'}
      localStorage.setItem('user_files', JSON.stringify(user));

    }
    catch(e){
      alert(e.toString())
      return
    }
  }

  function logOut(){
      let user = { userId:'',firstName:'',lastName:'',tags:''}
      localStorage.setItem('user_data', JSON.stringify(user));
  }

  const Display = ()=>{

    if(props.file === true){
      return(
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" size='sm' style={{backgroundColor: 'transparent',border: 'none'}} disabled> 
            {props.name}
        </Dropdown.Toggle>
      )
    }else if(props.name === 'File'){
      return(
        <>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" size='sm' style={{backgroundColor: 'transparent',border: 'none'}}>
                {props.name}
          </Dropdown.Toggle >
          <Dropdown.Menu className='super-colors' variant='dark'>
            <Dropdown.Item href="#" onClick = {handleShow}>
              {props.newFile}
            </Dropdown.Item>
            <Dropdown.Item href="#">
              {props.newFolder}
            </Dropdown.Item>
            <Dropdown.Item href="#">
            {props.save}
            </Dropdown.Item>
            <Dropdown.Item href="#">
            {props.saveAs}
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )
    }else if(props.name === 'Edit'){
      return(
        <>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" size='sm' style={{backgroundColor: 'transparent',border: 'none'}}>
            {props.name} 
          </Dropdown.Toggle >
          <Dropdown.Menu className='super-colors' variant='dark'>
          <Dropdown.Item href="#">
            {props.undo}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            {props.redo}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            {props.cut}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            {props.copy}
          </Dropdown.Item>
          <Dropdown.Item href="#">
            {props.paste}
          </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )
    }else{
      return(
        <>
          <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" size='sm' style={{backgroundColor: 'transparent',border: 'none'}}>
                  {props.name}
                  <AiOutlineUser/>
          </Dropdown.Toggle >
          <Dropdown.Menu className='super-colors' variant='dark'>
            <Dropdown.Item href="#">
              {userInfo.firstName} {userInfo.lastName}
            </Dropdown.Item>
            <Dropdown.Item href="#">
              Manage Account
            </Dropdown.Item>
            <Dropdown.Item href="/" onClick={logOut} >
                Sign Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </>
      )
    }
  }

  return (
    <div className='dropdownContainer'>
        <Dropdown>
          <Display/>
        </Dropdown>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Adding a File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
              <Form.Group className="mb-3" controlId="form">
                <Form.Label>File Name</Form.Label>
                <Form.Control type="fileName" placeholder="Enter File Name" onChange={e => setFileName(e.target.value)} />
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddFile} type='submit'>
            Create File
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}