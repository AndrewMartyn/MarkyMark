import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../StyleSheets/tabs.css'
import Dropdown from 'react-bootstrap/Dropdown';
  
export default function Tabs(props) {
  return (
    <div className='dropdownContainer'>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-button-dark-example1" variant="outline-secondary" size='sm' style={{backgroundColor: 'transparent',border: 'none', padding:'0.3em',marginLeft:'0.5em', marginRight:'0.5em'}}>
          {props.name}
        </Dropdown.Toggle>
        <Dropdown.Menu className='super-colors' variant='dark'>
          <Dropdown.Item href="#">
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
    </div>
  );
}