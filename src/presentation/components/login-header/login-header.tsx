
import React from "react"
import Styles from './login-header-styles.scss'
import Logo from "@/presentation/components/logo/logo";
import { memo } from 'react';


const LoginHeader: React.FC= () => {
    return (
        <header className={Styles.header}>
        <Logo />
        <h1>4Devs - Enquetes para programadores</h1>

        </header>

    )
}

export default memo (LoginHeader)