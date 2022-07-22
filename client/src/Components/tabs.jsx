import React , {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../StyleSheets/tabs.css'
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
  
export default function Tabs(props) {

  const [show, setShow] = useState(false);
  const [fileName,setFileName] = useState('')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  return (
    <div className='dropdownContainer'>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" size='sm' style={{backgroundColor: 'transparent',border: 'none', padding:'0.3em',marginLeft:'0.5em', marginRight:'0.5em'}}>
          {props.name}
        </Dropdown.Toggle >
        <Dropdown.Toggle id="dropdown-button-dark-example1" className='text-center' variant="outline-secondary"  size='sm' style={{backgroundColor: 'transparent',position:'relative',border: 'none', padding: '0',left:'80%',transform:'-80%'}} disabled>
          {props.fileName}
        </Dropdown.Toggle >
        <Dropdown.Menu className='super-colors' variant='dark'>
          <Dropdown.Item href="#" onClick = {handleShow}>
            New File
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Open File
          </Dropdown.Item>
          <Dropdown.Item href="#">
            Open Folder
          </Dropdown.Item>
        </Dropdown.Menu>
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