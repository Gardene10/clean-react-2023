import React from "react";
import {  BrowserRouter ,Route, Switch } from 'react-router-dom' //Routes, // instead of "Switch"
//import '@/presentation/styles/global.scss'

type Props = {
makeLogin : React.FC
}

const Router: React.FC<Props> = ({ makeLogin}: Props) => {
    return (
    <BrowserRouter>
    <Switch>

    <Route path='/login' exact component={makeLogin} />
    </Switch>
    </BrowserRouter>

    )
}
//mexi no Route quando mudeia a versao do history e route-dom 
export default Router

