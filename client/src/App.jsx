import React, { useState } from 'react';
import View from './View'
import Editor from './Editor'
import {darcula} from '@uiw/codemirror-theme-darcula'
function App() {

  const [text, setText] = useState("# Text")

  return (
    <div>
      <div>
        <Editor
          value={text}
          onChange={setText}
          theme={darcula}
        />
      </div>
      <div>
        <View value={text} />
      </div>
    </div>
  );
}
export default App;