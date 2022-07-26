import React, { useEffect, useCallback } from "react";
import {init,editDoc} from "./utils.js"
import useCodeMirror from "../useCodeMirror";
import "../StyleSheets/Editor.css";

const Editor = ({ initialDoc, onChange}) => {
    
    const handleChange = useCallback(
        (state) => {
            onChange(state.doc.toString(),localStorage.setItem('user_body', JSON.stringify(state.doc.toString())))
        },
        [onChange]
    );
    
    const [refContainer, editorView] = useCodeMirror({
        initialDoc: initialDoc,
        onChange: handleChange,
    });


    useEffect(() => {

        let body

        const onClick = async () =>{
            if (editorView) {
                init(editorView)
    
                let fileName = window.localStorage.getItem('file_name')
                let fileId = window.localStorage.getItem('file_id')
    
                try{

                    let userInfo = JSON.parse(window.localStorage.getItem('user_data'))
                    
                    const response = await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=${fileName}&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});
              
                    let res = JSON.parse(await response.text())
            
                    let found = res.results.find(file => file.noteId === fileId)
                   
                    body = found.noteBody
                    console.log(body)

                }catch(e){
                    alert(e.toString())
                    return
                }
    
                editDoc(body)
            }
        }

        onClick();

        return () => {
            onClick
        }
       
    });

    return <div className="editor-wrapper" ref={refContainer}></div>;
};

export default Editor;
