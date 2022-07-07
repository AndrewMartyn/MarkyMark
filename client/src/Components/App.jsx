import React, { useCallback, useState } from "react";
import SplitPane from "react-split-pane";
import Preview from "../Preview";
import Editor from "./Editor";
import "../StyleSheets/tailwind.css";
import "../StyleSheets/splitpane.css";
import Tabs from './tabs'
import FileSystemNavigator from "./tree";

function App() {
    const [doc, setDoc] = useState(`# Text`);

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);

    return (
        <div id='file'>
            <Tabs/>
            <SplitPane split="vertical" minSize={0} defaultSize="20%">
                <FileSystemNavigator/>
                <SplitPane split="vertical" defaultSize="50%">
                    <Editor onChange={handleDocChange} doc={doc} />
                    <Preview doc={doc} />
                </SplitPane>
            </SplitPane>
        </div>
    );
}
export default App;