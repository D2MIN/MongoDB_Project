import { Link } from "react-router-dom";
import style from "./header.module.scss";
import React, { useEffect, useState } from "react";

function Header(){

    const [userLoggedInStatus, setUserLoggedInStatus] = useState<boolean>(false);
    const [user, setUser] = useState<string>('');
    
    useEffect(()=>{
        setUserLoggedInStatus(() => document.cookie.includes('userLoggedIn=true'));
        if(userLoggedInStatus){
            //document.cookie.split('; ').find(row => row.startsWith('userName=')).split('=')[1]
            const cookie = document.cookie.split('; ');
            const arrCookie = cookie.map((el)=>el.split('='))
            let login = '';
            arrCookie.forEach((el)=>{
                console.log(el[1])
                if(el[0] == 'userName'){
                    login = el[1]
                }
            });
            setUser(() => login);
        }
    },[user,userLoggedInStatus]);

    return(
        <div className={style.headerSection}>
            <div className={style.header}>
                <div className={style.logo}>Управление складами</div>
                <div className={style.nuvSection}>
                    <div className={style.nuvLink}><Link className={style.Link} to={'/'}>Просмотр складов</Link></div>
                    <div className={style.nuvLink}><Link className={style.Link} to={'/createStorage'}>Создать склад</Link></div>
                    <div className={style.nuvLink}>
                        <Link className={style.Link} to={'/login'}>
                            {userLoggedInStatus == true ? user : 'Войти'}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;