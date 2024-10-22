import style from "./header.module.scss";

function Header(){
    return(
        <div className={style.headerSection}>
            <div className={style.header}>
                <div className={style.logo}>Управление складами</div>
                <div className={style.nuvSection}>
                    <div className={style.nuvLink}>Просмотр складов</div>
                    <div className={style.nuvLink}>Создать склад</div>
                </div>
            </div>
        </div>
    );
}

export default Header;