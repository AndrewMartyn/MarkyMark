import React, { useCallback, useState } from "react";
import SplitPane from "react-split-pane";
import Preview from "../Components/Preview";
import Editor from "../Components/Editor";
import "../StyleSheets/splitpane.css";
import Tabs from "../Components/Tabs";
import FileTree from "../Components/FileTree.jsx";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useEffect } from "react";

function TextEditor() {
    const [doc, setDoc] = useState(`test`);
    const [name, setName] = useState(`test`);
    const [change,setChange] = useState(false);
    const [clickedFile, setClickedFile] = useState("nothing");

    console.log(change)
    const fileClicked = clickedFile === "nothing" ? true : false;

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);

    // useEffect(()=>{
    //     TreeFile()
    // },[change === true])

    // const TreeFile = ()=>{
    //     return(
    //         <div className="fileContainer">
    //             <FileTree clicked={setClickedFile} change={change} changed ={setChange} doc={doc} setDoc={setDoc} />
    //         </div>
    //     )
    // }

    return (
        <div className="texteditor">
            <div style={{ backgroundColor: "rgb(30,34,39)" }}>
                <Container fluid>
                    <Row class="row">
                        <Col md={3} style={{ textAlign: "start", padding: "0" }}>
                            <Tabs
                                name="File"
                                newFile="New File"
                                openFile="Open File"
                                save="Save"
                                saveAs="Save as"
                                clickedFile={clickedFile}
                            />
                            <Tabs name="Edit" undo="Undo" redo="Redo" cut="Cut" copy="Copy" paste="Paste" clickedFile={clickedFile} />
                        </Col>
                        <Col md={7} style={{ textAlign: "center" }}>
                            {fileClicked ? (
                                <></>
                            ) : (
                                <Tabs name={clickedFile.node.name} file={true} clickedFile={clickedFile} style={{ color: "rgb(157,165,180)" }} />
                            )}
                        </Col>
                        <Col md={0} style={{ textAlign: "end" }}>
                            <Tabs name="User" />
                        </Col>
                    </Row>
                </Container>
            </div>

            <SplitPane split="vertical" minSize="0" defaultSize="10%" className="splitpaneContainer">
               <div className="fileContainer">
                    <FileTree clicked={setClickedFile} change={change} changed ={setChange} doc={doc} setDoc={setDoc} />
               </div>
                <SplitPane split="vertical" minSize="50%" defaultSize="50%" className="splitpaneContainer">
                    <div className="editor">
                        <Editor clicked={clickedFile} changed={change} setChange={setChange} onChange={handleDocChange} initialDoc={doc} />
                    </div>
                    <Preview  doc={doc} />
                </SplitPane>
            </SplitPane>
        </div>
    );
}
export default TextEditor;

