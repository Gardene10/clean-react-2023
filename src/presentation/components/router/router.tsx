import React from "react";
import {  BrowserRouter ,Route, Switch } from 'react-router-dom' //Routes, // instead of "Switch"
import '@/presentation/styles/global.scss'
import SignUp from "@/presentation/pages/signup/signup";

type Props = {
makeLogin : React.FC
}

const Router: React.FC<Props> = ({ makeLogin}: Props) => {
    return (
    <BrowserRouter>
    <Switch>

    <Route path="/login" exact component={makeLogin} />
    <Route path="/signup" exact component={SignUp} />
    </Switch>
    </BrowserRouter>

    )
} 
export default Router

