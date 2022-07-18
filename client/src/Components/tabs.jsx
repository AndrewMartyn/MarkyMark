import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "../StyleSheets/tabs.css";
import Dropdown from "react-bootstrap/Dropdown";
import createNote from "../services/NoteServices";

export default function Tabs() {
    return (
        <div className="dropdownContainer">
            <Dropdown>
                <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="outline-secondary"
                    size="lg"
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "0.3em",
                        marginLeft: "0.5em",
                        marginRight: "0.5em",
                    }}
                >
                    File
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors" variant="dark">
                    <Dropdown.Item>New File</Dropdown.Item>
                    <Dropdown.Item href="#">Open File</Dropdown.Item>
                    <Dropdown.Item href="#">Open Folder</Dropdown.Item>
                </Dropdown.Menu>
                <Dropdown.Toggle
                    id="dropdown-button-dark-example1"
                    variant="outline-secondary"
                    size="lg"
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        padding: "0.3em",
                        marginLeft: "0.5em",
                        marginRight: "0.5em",
                    }}
                >
                    Edit
                </Dropdown.Toggle>
                <Dropdown.Menu className="super-colors" variant="dark">
                    <Dropdown.Item>New File</Dropdown.Item>
                    <Dropdown.Item href="#">Open File</Dropdown.Item>
                    <Dropdown.Item href="#">Open Folder</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

function newFile() {}
