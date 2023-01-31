import React, {useState} from "react";
import Styles from './login-styles.scss'
import { LoginHeader, FormStatus,Input,Footer} from "@/presentation/components";
import Context from '@/presentation/contexts/form/form-context'

type stateProps = {
    isLoading: boolean
    errorMessage: string

}

const Login: React.FC =() => {
   const [state] = useState<stateProps>({
    isLoading: false,
    errorMessage: ''

   })

    return (
        <div className={Styles.login}>
            <LoginHeader/>

            <Context.Provider value={state}>

            <form className={Styles.form}>
                <h2>Login</h2>

                <input type="email" name="email" placeholder="Digite seu e-mail" />
                <input type="password" name="password" placeholder="Digite sua senha" />

                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <FormStatus/>
            </form>

            </Context.Provider>

            <Footer/>
          </div>
    )
}

export default Login 