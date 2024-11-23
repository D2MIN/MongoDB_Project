import React, { useState } from "react";
import style from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";

function RegisterPage(){

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");

    function registerUser(){
        if(password != checkPassword){
            alert('Пароли не совпадают');
        }else{
            alert('Пароли совпадают');
        }
    }

    return(
        <div className={style.RegisterPage}>
            <div className={style.registerSection}>
                <h2 className={style.title}>Добро пожаловать</h2>
                <form className={style.registerForm} action="">
                    <input 
                        type="text" 
                        className={style.login} 
                        value={login}
                        onChange={(e)=>setLogin(e.target.value)}
                        id="login" 
                        placeholder="Логин"
                    />
                    <input 
                        type="password" 
                        className={style.password} 
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        id="password" 
                        placeholder="Пароль"
                    />
                    <input 
                        type="password" 
                        className={style.checkPassword}
                        value={checkPassword}
                        onChange={(e)=>setCheckPassword(e.target.value)}
                        id="password" 
                        placeholder="Повторите пароль"
                    />
                    <button
                        type="submit"
                        className={style.submitBtn}
                        onClick={()=>registerUser()}
                    >
                            Зарегистрироваться
                    </button>
                    <Link to='/login' className={style.loginLink}>Войти</Link>
                    <Link to='/' className={style.homeLink}><button className={style.homeBtn}>Вернутся на главную</button></Link>
                </form>
            </div>
        </div>
    )
}

export default RegisterPage;