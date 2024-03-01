import React, { useLayoutEffect} from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";


const Router = () => {

    return (
        <Routes>
            <Route index element={<Login/>}></Route>
            <Route path="login" element={<Login/>}></Route>
            <Route path="signup" element={<Signup/>}></Route>
            <Route path="dashboard/:username" element={<Dashboard/>}></Route>
        </Routes>
    );
}


export default Router;