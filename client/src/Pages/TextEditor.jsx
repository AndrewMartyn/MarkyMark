import React, { useCallback, useState } from "react";
import SplitPane from "react-split-pane";
import Preview from "../Preview";
import Editor from "../Components/Editor";
import "../StyleSheets/splitpane.css";
import Tabs from '../Components/tabs'
import FileTree from "../Components/FileTree.jsx";
import '../StyleSheets/App.css'

function TextEditor() {

    const [doc, setDoc] = useState(`# Text`);
    const [createfile,setCreateFile] = useState({fileName:'',type:''})
    const [clickedFile,setClickedFile] = useState('nothing')

    const fileClicked = clickedFile === 'nothing' ? true : false
    var mins = 1, the_interval = mins * 60 * 1000

    const handleDocChange = useCallback((newDoc) => {
        setDoc(newDoc);
    }, []);


    if(fileClicked !== true){

        

        
        setTimeout(async function(){
            try{
    
                let userInfo = JSON.parse(window.localStorage.getItem('user_data'))
                
                await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=${clickedFile.node.name}&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});
          
                let object = {
                    name:clickedFile.node.name,
                    body:doc,
                    tags: [],
                }
        
                let js = JSON.stringify(object)
                
                await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?noteId=${clickedFile.node.id}`,{method:'PUT',body : js,headers:{'Content-Type': 'application/json'}});
                
                

              }
              catch(e){
                alert(e.toString())
                return
              }
        },the_interval)
    }else{

    }

    return (
        <div className="App" >
            <div style={{backgroundColor:'rgb(30,34,39)'}}>
                <Tabs file = {setCreateFile} name='File'/>
                <Tabs name='Edit'/>
                <Tabs name='Help'/>
                {fileClicked ? <></> : <span style={{color:'rgb(157,165,180)',position:'relative',left:'45%',transform:'translate(-45%)'}}>{clickedFile.node.name}</span>}
                
            </div>
    
            <SplitPane split="vertical" minSize="0" defaultSize="10%" style={{position:'static'}}>
                <div style={{backgroundColor:'rgb(30,34,39)', height: '100vh'}}>
                    <FileTree clicked ={setClickedFile}/>
                </div>
                <SplitPane split="vertical" minSize="50%" defaultSize="50%" style={{position:'static'}}>
                    <Editor onChange={handleDocChange} doc={doc} />
                    <Preview doc={doc}/>
                </SplitPane>
            </SplitPane>
        </div>
    );
}
export default TextEditor;