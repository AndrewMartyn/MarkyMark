import React, { useCallback, useState } from "react";
import SplitPane from "react-split-pane";
import Preview from "../Components/Preview";
import Editor, { test } from "../Components/Editor";
import "../StyleSheets/splitpane.css";
import Tabs from "../Components/Tabs";
import FileTree from "../Components/FileTree.jsx";
import "../StyleSheets/App.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function TextEditor() {
    const [doc, setDoc] = useState(`test`);
    const [name, setName] = useState(`test`);
    const [createfile, setCreateFile] = useState({ fileName: "", type: "" });
    const [clickedFile, setClickedFile] = useState("nothing");

    const fileClicked = clickedFile === "nothing" ? true : false;

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);

    return (
        <div className="App">
            <div style={{ backgroundColor: "rgb(30,34,39)" }}>
                <Container fluid>
                    <Row class="row">
                        <Col md={3} style={{ textAlign: "start", padding: "0" }}>
                            <Tabs
                                file={setCreateFile}
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

            <SplitPane split="vertical" minSize="0" defaultSize="10%" style={{ position: "static" }}>
                <div
                    style={{
                        backgroundColor: "rgb(30,34,39)",
                        height: "100vh",
                    }}
                >
                    <FileTree clicked={setClickedFile} doc={doc} setDoc={setDoc} />
                </div>
                <SplitPane split="vertical" minSize="50%" defaultSize="50%" style={{ position: "static" }}>
                    <Editor onChange={handleDocChange} initialDoc={doc} clicked={fileClicked} />
                    <Preview doc={doc} />
                </SplitPane>
            </SplitPane>
        </div>
    );
}
export default TextEditor;

// if(fileClicked !== true){

//     setTimeout(async function(){
//         try{

//             let userInfo = JSON.parse(window.localStorage.getItem('user_data'))

//             await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=${clickedFile.node.name}&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});

//             let object = {
//                 name:clickedFile.node.name,
//                 body:doc,
//                 tags: [],
//             }

//             let js = JSON.stringify(object)

//             await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?noteId=${clickedFile.node.id}`,{method:'PUT',body :js,headers:{'Content-Type': 'application/json'}});

//             console.log('we updated the body')

//           }
//           catch(e){
//             alert(e.toString())
//             return
//           }
//     },the_interval)
// }else{

// }
