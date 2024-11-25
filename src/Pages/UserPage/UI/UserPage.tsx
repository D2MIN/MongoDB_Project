import React, { useEffect, useState } from "react";
import style from './UserPage.module.scss';
import { useNavigate } from "react-router";

function UserPage(){

    const navigate = useNavigate();
    const [user, setUser] = useState<string>('')

    useEffect(()=>{
        if(!document.cookie.includes('userLoggedIn=true')){
            navigate('/')
        }else{
            const cookie = document.cookie.split('; ');
            const arrCookie = cookie.map((el)=>el.split('='))
            let login = '';
            arrCookie.forEach((el)=>{
                if(el[0] == 'userName'){
                    login = el[1]
                }
            });
            setUser(() => login);
        }
    },[]);

    function exitUser(){
        document.cookie = "userLoggedIn=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "userName=''; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate('/');
    }

    return(
        <div className={style.UserPage}>
            <div className={style.userPageSection}>
                <div className={style.userLoginSection}>
                    <h2>
                        Вы находитесь в аккаунте пользователя: 
                        <strong className={style.userLogin}>
                            {user}
                        </strong>
                    </h2>
                </div>
                <div className={style.userMenu}>
                    <button 
                        className={style.exitBtn}
                        onClick={()=>{exitUser()}}
                    >
                            Выйти из аккаунта
                    </button>
                    <button 
                        className={style.exitBtn}
                        onClick={()=>{navigate('/')}}
                    >
                            Вернутся на главную
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;