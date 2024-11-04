import { Link } from "react-router-dom";
import style from "./header.module.scss";
import React from "react";

function Header(){
    return(
        <div className={style.headerSection}>
            <div className={style.header}>
                <div className={style.logo}>Управление складами</div>
                <div className={style.nuvSection}>
                    <div className={style.nuvLink}><Link className={style.Link} to={'/'}>Просмотр складов</Link></div>
                    <div className={style.nuvLink}><Link className={style.Link} to={'/createStorage'}>Создать склад</Link></div>
                    <div className={style.nuvLink}><Link className={style.Link} to={'/login'}>Войти</Link></div>
                </div>
            </div>
        </div>
    );
}

export default Header;