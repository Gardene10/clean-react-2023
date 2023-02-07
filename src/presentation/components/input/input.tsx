
import React, { useContext , useState} from "react"
import Context from '@/presentation/contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>

const Input : React.FC<Props> = (props:Props) => {
    const {state, setState} = useContext(Context)  
    const error = state[`${props.name}Error`]
    const enableInput = (event: React.FocusEvent<HTMLInputElement>): void => {
        event.target.readOnly = false
    }
    const getStatus = (): string => {
        return error ? '🔴' : '🟢'

    }
    const getTitle =(): string =>{
        return error || 'tudo ok'

    }

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }
    return (
       <div className={Styles.inputWrap}>
        <input {...props} data-testid={props.name} readOnly onFocus={enableInput} onChange={handleChange}  />
        <span data-testid={`${props.name}-status`} title={getTitle()} className={Styles.status} >{getStatus()}</span>
       </div>

    )
}

export default Input