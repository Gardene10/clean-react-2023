import React from "react";
import ReactDOM from 'react-dom';
import {Router} from '@/presentation/components'
import { makeLogin } from "./factories/pages/login/login-factory";
import '@/presentation/styles/global.scss'
import { makeSignUp } from "./factories/pages/signup/signup-factory";

ReactDOM.render(
    <Router 
    makeLogin={makeLogin}
    makeSignUp={makeSignUp}
    />,
   document.getElementById('main')
)