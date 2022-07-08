import React, { useCallback, useState } from "react";

import SplitPane from "react-split-pane";
import Preview from "./Preview";
import Editor from "./Editor";
import "../css/tailwind.css";
import "../css/splitpane.css";
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
            <BrandExample />
            <SplitPane split="vertical" defaultSize="20%">
                {/* <Browser /> */}
                Browser
                <SplitPane split="vertical" defaultSize="50%">
                    <Editor onChange={handleDocChange} doc={doc} />
                    <Preview doc={doc} />
                </SplitPane>
            </SplitPane>
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
