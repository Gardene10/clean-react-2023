import React from "react";
import {  BrowserRouter ,Route, Switch } from 'react-router-dom' //Routes, // instead of "Switch"
import { Login } from "@/presentation/pages";
//import '@/presentation/styles/global.scss'



const Router: React.FC = () => {
    return (
    <BrowserRouter>
    <Switch>

    <Route path='/login' component={Login} />
    </Switch>
    </BrowserRouter>

    )
}
//mexi no Route quando mudeia a versao do history e route-dom 
export default Router

