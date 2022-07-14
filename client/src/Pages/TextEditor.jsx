import React, { useCallback, useState } from "react";
import SplitPane from "react-split-pane";
import Preview from "../Preview";
import Editor from "../Components/Editor";
import "../StyleSheets/splitpane.css";
import Tabs from "../Components/tabs";
import FileSystemNavigator from "../Components/tree";
import SideNav from "../Components/SideNav.jsx";
import "../StyleSheets/App.css";

function TextEditor() {
    const [doc, setDoc] = useState(`# Text`);

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);

    return (
        <div className="App">
            <div style={{ backgroundColor: "rgb(30,34,39)" }}>
                <Tabs name="File" />
                <Tabs name="Edit" />
                <Tabs name="Help" />
            </div>
            {/* <SideNav/> */}
            <SplitPane
                split="vertical"
                minSize="0"
                defaultSize="10%"
                style={{ position: "static" }}
            >
                <div
                    style={{
                        backgroundColor: "rgb(30,34,39)",
                        color: "white",
                        height: "100vh",
                    }}
                >
                    <FileSystemNavigator />
                </div>
                <SplitPane
                    split="vertical"
                    minSize="50%"
                    defaultSize="50%"
                    style={{ position: "static" }}
                >
                    <Editor onChange={handleDocChange} doc={doc} />
                    <Preview doc={doc} />
                </SplitPane>
            </SplitPane>
        </div>
    );
}

export default TextEditor;
