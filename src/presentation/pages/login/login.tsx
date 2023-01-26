import React from "react";
import Styles from './login-styles.scss'
import Header from "@/presentation/components/login-header/login-header";
import Footer from "@/presentation/components/footer/footer";
import Input from "@/presentation/components/form-status/form-status";
import FormStatus from "@/presentation/components/input/input";

const Login: React.FC =() => {
    return (
        <div className={Styles.login}>
            <Header/>

            <form className={Styles.form}>
                <h2>Login</h2>
                <Input/>
                
                <input type="email" name="email" placeholder="Digite seu e-mail" />
                <input type="password" name="password" placeholder="Digite sua senha" />

                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>
                <FormStatus/>
            </form>
            <Footer/>
          </div>
    )
}

export default Login 