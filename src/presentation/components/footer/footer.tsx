
import React from "react"
import Styles from './footer-styles.scss'
import { memo } from 'react';


const Footer: React.FC = () => {
    return (
        <footer className={Styles.footer}/>

    )
}

export default memo (Footer)