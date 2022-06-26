import React, {useRef } from "react";
import CodeMirror from "@uiw/react-codemirror";
import {markdown} from "@codemirror/lang-markdown"


function Editor({ value, onChange, theme}) {
    const editorRef = useRef();
  
    return (
      <div>
        <CodeMirror
          ref={editorRef}
          value={value}
          onChange={onChange}
          theme={theme}
          height="200px"
          extensions={[markdown()]}
          options={{
            lineNumbers: true,
            tabSize: 2,
            readOnly: false,
            smartIndent: true,
            matchBrackets: true,
          }}
        />
      </div>
    );
}

export default Editor;