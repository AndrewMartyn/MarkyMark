import React from "react";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgotPassword from "./Pages/ForgotPassword";
import Reset from "./Pages/Reset";
import Account from "./Pages/Account";
import TextEditor from "./Pages/TextEditor";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="">
            <Routes>
                <Route exact path="/" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="forgot" element={<ForgotPassword />} />
                <Route path="reset" element={<Reset />} />
                <Route path="account" element={<Account />} />
                <Route path="texteditor" element={<TextEditor />} />
            </Routes>
        </div>
    );
}
export default App;
