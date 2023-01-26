
import { type } from "os"
import React from "react"
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Footer: React.FC<Props> = (props: Props) => {
    return (
        <input {...props} />

    )
}

export default Footer