import React, { useState } from "react";
import Styles from './signup-styles.scss'
import {LoginHeader, FormStatus,Input,Footer, Spinner} from "@/presentation/components";
import Context from '@/presentation/contexts/form/form-context'


const SignUp: React.FC =() => { 

    const [state] = useState({

        isLoading: false,
        nameError:'Campo Obrigatorio',
        emailError:'Campo Obrigatorio',
        mainlError:'',
        passwordError:'Campo Obrigatorio',
        passwordConfirmationError:'Campo Obrigatorio'
       
       })
    return (
        <div className={Styles.signup}>
            <LoginHeader/>
            <Context.Provider value={{state}}>
            <form  className={Styles.form} >
                <h2>Criar Conta</h2>
                <Input type="text" name="name" placeholder="Digite seu nome"/>
                <Input type="email" name="email" placeholder="Digite seu e-mail"/>
                <Input type="password" name="password" placeholder="Digite sua senha"/>
                <Input type="password" name="passwordConfirmation" placeholder="Repita sua senha"/>
                <button data-testid="submit" disabled className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}> Voltar para o Login</span>
                <FormStatus/>
            </form>
            </Context.Provider>
            <Footer/>
          </div>
    )
}

export default SignUp 

// aqui o type script nao permite comparar dessa forma ...disabled={!!state.emailError || !!state.passwordError} entao adicionando as !! ele converte para boolean e deixa passar