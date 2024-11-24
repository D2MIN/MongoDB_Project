import React, { useState } from "react";
import style from "./RegisterPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../BL/Register.tsx";

function RegisterPage(){

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const navigate = useNavigate();

    function register(){
        if(password != checkPassword){
            alert('Пароли не совпадают');
        }else{
            const res = RegisterUser(login, password);
            if(res == true){
                navigate('/');
                document.cookie = "userLoggedIn=true";
                document.cookie = `userName=${login}`;
            }
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
                        onClick={(e) => {
                            e.preventDefault(); // Отключение стандартного поведения формы
                            register();
                        }}
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