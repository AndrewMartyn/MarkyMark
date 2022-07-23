import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Account from "./Pages/Account";
import Reset from "./Pages/Reset";
import ForgotPassword from "./Pages/ForgotPassword";
import TextEditor from "./Pages/TextEditor";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="account" element={<Account />} />
            <Route path="reset" element={<Reset />} />
            <Route path="forgot" element={<ForgotPassword />} />
            <Route path="texteditor" element={<TextEditor />} />
        </Routes>
    );
}
export default App;
