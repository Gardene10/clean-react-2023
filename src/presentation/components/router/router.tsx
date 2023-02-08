import React from "react";
import {  BrowserRouter , Routes,Route } from 'react-router-dom' //Routes, // instead of "Switch"
import { Login } from "@/presentation/pages";
//import '@/presentation/styles/global.scss'



const Router: React.FC = () => {
    return (
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login validation={undefined} authentication={undefined} />} />
    </Routes>
    </BrowserRouter>

    )
}

export default Router

