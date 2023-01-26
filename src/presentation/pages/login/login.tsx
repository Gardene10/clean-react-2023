import React from "react";
import Styles from './login-styles.scss'
import Spinner from "@/presentation/components/spinner/spinner";
import Header from "@/presentation/components/login-header/login-header";
import footer from "@/presentation/components/footer/footer";


const Login: React.FC =() => {
    return (
        <div className={Styles.login}>
            <Header/>
            
            
           
            

            <form className={Styles.form}>
                <h2>Login</h2>
                <input type="email" name="email" placeholder="Digite seu e-mail" />
                <input type="password" name="password" placeholder="Digite sua senha" />

                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>

                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner} />
                    
                    <span className={Styles.error}>Erro</span>
                </div>
            </form>
            <footer/>
          </div>
    )
}

export default Login