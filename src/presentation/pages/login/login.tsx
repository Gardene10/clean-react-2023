import React, {useState,useEffect} from "react";
import Styles from './login-styles.scss'
import {LoginHeader, FormStatus,Input,Footer, Spinner} from "@/presentation/components";
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from "@/presentation/protocols/validation";
import { Authentication } from "@/domain/usecases";


type Props = {
    validation: Validation
    authentication: Authentication
}

const Login: React.FC<Props>=({validation,authentication}: Props) => { 
   const [state,setState] = useState({
    email:'',
    password:'',
    isLoading: false,
    mainError:'',
    emailError:'',
    passwordError:''

   })
   useEffect(()=> {
    setState({
        ...state,
        emailError: validation.validate('email', state.email),
        passwordError: validation.validate('password', state.password)
    })
    
   },[state.email,state.password])

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    if (state.isLoading){
        return
    }
    setState({ ...state , isLoading: true})

    await authentication.auth({ 
    email: state.email,
    password: state.password
   })

   }
    return (
        <div className={Styles.login}>
            <LoginHeader/>

            <Context.Provider value={{state,setState}}>

            <form className={Styles.form} onSubmit={handleSubmit} >
                <h2>Login</h2>
                <Input type="email" name="email" placeholder="Digite seu e-mail"/>
                <Input type="password" name="password" placeholder="Digite sua senha"/>

                <button data-testid="submit" disabled={!!state.emailError || !!state.passwordError} className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner}/>
                    <span className={Styles.error}>Erro</span>
                </div>

                <FormStatus/>
            </form>

            </Context.Provider>

            <Footer/>
          </div>
    )
}

export default Login 

// aqui o type script nao permite comparar dessa forma ...disabled={!!state.emailError || !!state.passwordError} entao adicionando as !! ele converte para boolean e deixa passar