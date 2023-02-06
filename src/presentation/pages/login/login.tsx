import React, {useState,useEffect} from "react";
import Styles from './login-styles.scss'
import {LoginHeader, FormStatus,Input,Footer, Spinner} from "@/presentation/components";
import Context from '@/presentation/contexts/form/form-context'
import { Validation } from "@/presentation/protocols/validation";


type Props = {
    validation: Validation
}

const Login: React.FC<Props>=({validation}: Props) => { 
   const [state,setState] = useState({
    email:'',
    password:'',
    isLoading: false,
    mainError:'',
    emailError:'campo obrigatorio',
    passwordError:'campo obrigatorio'

   })
   useEffect(()=> {
    validation.validate({ email: state.email})
   },[state.email])

   useEffect(()=> {
    validation.validate({ password: state.password})
   },[state.password])

    return (
        <div className={Styles.login}>
            <LoginHeader/>

            <Context.Provider value={{state,setState}}>

            <form className={Styles.form}>
                <h2>Login</h2>
                <Input type="email" name="email" placeholder="Digite seu e-mail"/>
                <Input type="password" name="password" placeholder="Digite sua senha"/>

                <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
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
