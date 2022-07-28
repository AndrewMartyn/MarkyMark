import React, { useEffect, useCallback } from "react";
import { init, editDoc, retrieveToken } from "../utils.js";
import useCodeMirror from "./useCodeMirror";
import "../StyleSheets/Editor.css";

const Editor = ({ initialDoc, onChange, clicked, setChange,changed }) => {

    const url = 'https://marky-mark-clone.herokuapp.com/'
    const handleChange = useCallback(
        (state) => {
            onChange(state.doc.toString(), localStorage.setItem("user_body", JSON.stringify(state.doc.toString())));
        },
        [onChange]
    );

    const [refContainer, editorView] = useCodeMirror({
        initialDoc: initialDoc,
        onChange: handleChange,
    });

    useEffect(() => {
        let body;

        const onClick = async () => {
            if (editorView) {
                init(editorView);

                let fileName = window.localStorage.getItem("file_name");
                let fileId = window.localStorage.getItem("file_id");
                let accessToken = retrieveToken();

                try {
                    let userInfo = JSON.parse(window.localStorage.getItem("user_data"));

                    const response = await fetch(
                        `${url}api/users/${userInfo.id}/notes?searchText=${fileName}&tags[]=&accessToken=${accessToken}`,
                        { method: "GET", headers: { "Content-Type": "application/json" }}
                    );

                    let res = JSON.parse(await response.text());

                    let found = res.results.find((file) => file.noteId === fileId);

                    body = found.noteBody;
                } catch (e) {
                   
                }

                editDoc(body)
                setChange(false)
            }
        };

        onClick();

        return () => {
            
        };
    }, [clicked,changed]);

    return <div className="editor-wrapper" ref={refContainer}></div>;
};

export default Editor;
