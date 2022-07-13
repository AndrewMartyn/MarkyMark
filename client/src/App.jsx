import React from 'react'
import SignIn from './Pages/SignIn'
import SignUp from './Pages/SignUp';
import TextEditor from './Pages/TextEditor'
import {Routes,Route } from "react-router-dom";


function App() {
    return(
        <Routes>
          <Route path='/' element = {<SignIn/>} />
          <Route path='signup' element = {<SignUp/>} />
          <Route path='texteditor' element = {<TextEditor/>} />
        </Routes>
    )
}
export default App;