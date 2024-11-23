import React, { useState } from "react";
import style from "./LoginPage.module.scss";
import { Link } from "react-router-dom";

function LoginPage(){

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return(
        <div className={style.LoginPage}>
            <div className={style.loginSection}>
                <h2 className={style.title}>С возвращением!</h2>
                <form className={style.loginForm} action="">
                    <input 
                        onChange={(e)=>setLogin(e.target.value)} 
                        value={login} 
                        type="text" 
                        className={style.login} 
                        id="login" 
                        placeholder="Логин"
                    />
                    <input 
                        onChange={(e)=>setPassword(e.target.value)} 
                        value={password} 
                        type="text" 
                        className={style.password} 
                        id="password" 
                        placeholder="Пароль"
                    />
                    <button type="submit" className={style.submitBtn}>Войти</button>
                    <Link to='/register' className={style.registerLink}>Зарегестрироваться</Link>
                    <Link to='/' className={style.homeLink}><button className={style.homeBtn}>Вернутся на главную</button></Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;