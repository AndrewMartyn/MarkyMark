import React, { useState , useEffect} from "react";
import Tree from "./Tree/Tree.js";
import "../StyleSheets/FileTree.css";
import { storeToken, retrieveToken } from "../utils";

export default function FileTree(props) {
    window.onload = onLoad

    const url = 'https://marky-mark-clone.herokuapp.com/'
    const [allFiles, setFiles] = useState([]);

    const onLoad = async ()=>{
        try {
            setFiles([])
            let userInfo = JSON.parse(window.localStorage.getItem("user_data"));
            console.log(userInfo);

            const response = await fetch(
                `${url}api/users/${userInfo.userId}/notes?searchText=&tags[]=&accessToken=${retrieveToken()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            let res = JSON.parse(await response.text());

            res.results.map((file) => {
                const container = { type: "", name: "", id: "" };

                container.type = "file";
                container.name = `${file.noteName}`;
                container.id = `${file.noteId}`;

                setFiles((files) => [...files, container]);
            });
        } catch (e) {
            console.log(e.toString());
            return;
        }
    }

    const onChange = async ()=>{
        try {
            let userInfo = JSON.parse(window.localStorage.getItem("user_data"));

            console.log(userInfo);

            const response = await fetch(
                `${url}api/users/${userInfo.userId}/notes?searchText=&tags[]=&accessToken=${retrieveToken()}`,
                {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                }
            );

            let res = JSON.parse(await response.text());

            res.results.map((file) => {
                setFiles([{
                    name: file.noteName,
                    id: file.note,
                    type: file.type
                }]);
            });
            setTest(1)
        } catch (e) {
            console.log(e.toString());
            return;
        }
    }

    useEffect(()=>{
        onLoad();
    },[props.change === true])


    const handleClick = (node) => {
        props.clicked(node);
    };

    const handleUpdate = (state) => {
        localStorage.setItem(
            "tree",
            JSON.stringify(state, function (key, value) {
                if (key === "parentNode" || key === "id") {
                    return null;
                }
                return value;
            })
        );
    };

    return (
        <div className="App">
            <Tree data={allFiles} changed={props.changed} onUpdate={handleUpdate} onNodeClick={handleClick} setDoc={props.setDoc} doc={props.doc} />
        </div>
    );
}
