import React, { useCallback, useState } from "react";

import SplitPane from "react-split-pane";
import Preview from "./Preview";
import Editor from "./Editor";
import "./tailwind.css";
import "./splitpane.css";

function App() {
    const [doc, setDoc] = useState(`# Text`);

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);

    return (
        <SplitPane split="vertical" defaultSize="50%">
            <SplitPane split="vertical" defaultSize="25%">
                Sidebar
                <Editor onChange={handleDocChange} doc={doc} />
            </SplitPane>
            <Preview doc={doc} />
        </SplitPane>
    );
}
export default App;
