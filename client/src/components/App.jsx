import React, { useCallback, useState } from "react";

import SplitPane, { Pane } from "react-split-pane";
import Preview from "./Preview";
import Editor from "./Editor";
import "../css/tailwind.css";
import "../css/splitpane.css";
import "../css/App.css";
import BrandExample from "./BrandExample";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
    const [doc, setDoc] = useState(`# Text`);

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);

    return (
        <div>
            <Container fluid className="wrapper">
                <Row className="">Navbar</Row>
                <Row className="app-body">
                    <Col className="side-panel" md={2}>
                        Explorer
                    </Col>
                    <Col className="app-main">
                        <SplitPane
                            className="split-pane"
                            split="vertical"
                            defaultSize="50%"
                        >
                            <div className="editor-wrapper">Editor</div>
                            <div className="preview-wrapper">Preview</div>
                        </SplitPane>
                    </Col>
                </Row>
                <Row className="app footer">Footer</Row>
            </Container>
        </div>
    );

    // return (
    //     <>
    //         <BrandExample />
    //         <Container fluid>
    //             <Row>
    //                 <Col sm={2}>Browser</Col>
    //                 <Col>
    //                     <Editor onChange={handleDocChange} doc={doc} />
    //                 </Col>
    //                 <Col>
    //                     <Preview doc={doc} />
    //                 </Col>
    //             </Row>
    //         </Container>
    //     </>
    // );
}
export default App;
