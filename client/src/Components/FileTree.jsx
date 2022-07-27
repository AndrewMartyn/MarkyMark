import React, { useState} from "react";
import Tree from "./Tree/Tree.js"
import '../StyleSheets/FileTree.css'


export default function FileTree(props) {
window.onload = onLoad

const [allFiles,setFiles] = useState([])

  async function onLoad(){
    try{

      let userInfo = JSON.parse(window.localStorage.getItem('user_data'))

      console.log(userInfo)
      
      const response = await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});

      let res = JSON.parse(await response.text())

      res.results.map(file => {
         const container = {type: '', name: '', id: ''}

         container.type = 'file'
         container.name = `${file.noteName}`
         container.id = `${file.noteId}`
         
         setFiles(files => [...files,container])
      })

    }
    catch(e){
      alert(e.toString())
      return
    }
  }

  const handleClick = (node) => {
      props.clicked(node)
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
        <Tree data={allFiles} onUpdate={handleUpdate} onNodeClick={handleClick} setDoc = {props.setDoc} doc={props.doc}/>
    </div>
  )
}