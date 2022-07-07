import React, { useEffect, useCallback } from "react";

import useCodeMirror from "../useCodeMirror";
import "../StyleSheets/Editor.css";

const Editor = ({ initialDoc, onChange }) => {
    const handleChange = useCallback(
        (state) => onChange(state.doc.toString()),
        [onChange]
    );
    const [refContainer, editorView] = useCodeMirror({
        initialDoc: initialDoc,
        onChange: handleChange,
    });

    useEffect(() => {
        if (editorView) {
            // do nothing
        }
    }, [editorView]);

    return <div className="editor-wrapper" ref={refContainer}></div>;
};

export default Editor;
