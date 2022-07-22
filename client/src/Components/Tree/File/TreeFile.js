import React, { useRef, useState } from "react";
import { AiOutlineFile, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai/index.js";

import { StyledFile } from "../File/TreeFile.style.js";
import { useTreeContext } from "../state/TreeContext.js";
import { ActionsWrapper, StyledName } from "../Tree.style.js";
import { PlaceholderInput } from "../TreePlaceholderInput.js";

import { FILE } from "../state/constants.js";
import FILE_ICONS from "../FileIcons.js";

const File = ({ name, id, node}) => {
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

        let res = JSON.parse(await response.text());
    
        console.log(res)

      }catch(e){
        alert(e.toString())
        return
      }
  };
  const handleNodeClick = React.useCallback(
    (e) => {
      e.stopPropagation();
      onNodeClick({ node });
    },
    [node]

  );
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
            </div>
          )}
        </ActionsWrapper>
      )}
    </StyledFile>
  );
};

export { File };
