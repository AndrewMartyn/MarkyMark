import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit,AiFillSave } from "react-icons/ai/index.js";

import { StyledFile } from "../File/TreeFile.style.js";
import { useTreeContext } from "../state/TreeContext.js";
import { ActionsWrapper, StyledName } from "../Tree.style.js";
import { PlaceholderInput } from "../TreePlaceholderInput.js";

import { FILE } from "../state/constants.js";
import FILE_ICONS from "../FileIcons.js";

const File = ({ name, id, node,setDoc,doc}) => {

  const { dispatch, isImparative, onNodeClick } = useTreeContext();
  const [isEditing, setEditing] = useState(false);
  const ext = useRef("");

  let splitted = name?.split(".");
  ext.current = splitted[splitted.length - 1];

  const toggleEditing = () => setEditing(!isEditing);
  const commitEditing = (name) => {
    dispatch({ type: FILE.EDIT, payload: { id, name } });
    setEditing(false);
  };

  const commitDelete = async () => {
      try{
        let userInfo = JSON.parse(window.localStorage.getItem('user_data'))

        console.log(node)

        let obj = {
          noteIds: [node.id],
          jwtToken: ''
        }

        let js = JSON.stringify(obj)

        const response = await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes`, {method:'DELETE',body:js,headers:{'Content-Type': 'application/json'}});


      }catch(e){
        alert(e.toString())
        return
      }
  };

  const handleNodeClick = React.useCallback(async()=>{

      onNodeClick({ node });

      window.localStorage.setItem('file_name',node.name)
      window.localStorage.setItem('file_id',node.id)

      try{

        let userInfo = JSON.parse(window.localStorage.getItem('user_data'))
        
        const response = await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=${node.name}&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});
  
        let res = JSON.parse(await response.text())

        let found = res.results.find(file => file.noteId === node.id)

        setDoc(found.noteBody)

      }catch(e){
        alert(e.toString())
        return
      }
  });

  const handleNodeSave = React.useCallback(async()=>{

    let body = JSON.parse(window.localStorage.getItem('user_body'))

    console.log(body)
    
    try{
    
      let userInfo = JSON.parse(window.localStorage.getItem('user_data'))
      
      await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?searchText=${node.name}&tags[]=&jwtToken=`,{method:'GET',headers:{'Content-Type': 'application/json'}});

      let object = {
          name:node.name,
          body:body,
          tags: [],
      }

      let js = JSON.stringify(object)
      
      await fetch(`http://localhost:5001/api/users/${userInfo.userId}/notes?noteId=${node.id}`,{method:'PUT',body :js,headers:{'Content-Type': 'application/json'}});
      
      console.log('we saved the body')

    }
    catch(e){
      alert(e.toString())
      return
    }
});

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <StyledFile onClick={handleNodeClick} className="tree__file" style={{background:'rgb(30,34,39)',color:'white'}}>
      {isEditing ? (
        <PlaceholderInput
          type="file"
          style={{background:'rgb(30,34,39)',color:'white'}}
          defaultValue={name}
          onSubmit={commitEditing}
          onCancel={handleCancel}
        />
      ) : (
        <ActionsWrapper style={{background:'rgb(30,34,39)',color:'white'}}>
          <StyledName style={{background:'rgb(30,34,39)',color:'white'}}>
            {FILE_ICONS[ext.current] ? (
              FILE_ICONS[ext.current]
            ) : (
              <AiOutlineFile />
            )}
            &nbsp;&nbsp;{name}
          </StyledName>
          {isImparative && (
            <div className="actions">
              <AiOutlineEdit onClick={toggleEditing} />
              <AiOutlineDelete onClick={commitDelete} />
              <AiFillSave onClick={handleNodeSave}/>
            </div>
          )}
        </ActionsWrapper>
      )}
    </StyledFile>
  );
};

export { File };
