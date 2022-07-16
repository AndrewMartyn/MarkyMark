import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import TextEditor from "./Pages/TextEditor";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="app" element={<TextEditor />} />
        </Routes>
    );
}
export default App;
