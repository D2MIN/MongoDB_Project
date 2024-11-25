import React, { useEffect, useState } from "react";
import style from "./LoginPage.module.scss";
import { Link, useNavigate } from "react-router-dom";
import { Login } from "../BL/Login.tsx";

function LoginPage(){

    const [login, setLogin] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorUser, setErrorUser] = useState<boolean>(false);
    const navigate = useNavigate();

    async function loginUser(login,password){
        const res = await Login(login,password);
        if(res != undefined){
            document.cookie = "userLoggedIn=true";
            document.cookie = `userName=${login}`;
            navigate('/')
        }else{
            setErrorUser(true);
        }
    }

    useEffect(()=>{
        setTimeout(()=>{
            setErrorUser(false);
        },1500);
    },[errorUser])

    return(
        <div className={style.LoginPage}>
            {errorUser && 
                <div className={style.errorPopap}>
                    Такого пользователя нет
                </div>
            }
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
                        type="password" 
                        className={style.password} 
                        id="password" 
                        placeholder="Пароль"
                    />
                    <button 
                        type="submit"
                        className={style.submitBtn}
                        onClick={(e)=>{
                            e.preventDefault();
                            loginUser(login,password)
                        }}
                    >
                            Войти
                    </button>
                    <Link to='/register' className={style.registerLink}>Зарегестрироваться</Link>
                    <Link to='/' className={style.homeLink}><button className={style.homeBtn}>Вернутся на главную</button></Link>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;