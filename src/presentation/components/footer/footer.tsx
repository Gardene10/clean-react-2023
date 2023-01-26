
import React from "react"
import Styles from './footer-styles.scss'
import Logo from "@/presentation/components/logo/logo";
import { memo } from 'react';


const Footer: React.FC = () => {
    return (
        <footer className={Styles.footer}></footer>

    )
}

export default memo (Footer)