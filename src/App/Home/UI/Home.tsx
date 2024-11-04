import React from "react";
import Header from "../../../Widgets/Header/UI/Header.tsx";
import Search from "../../../Widgets/Search/UI/Search.tsx";
import StorageList from "../../../Widgets/StorageList/UI/StorageList.tsx";
import style from './Home.module.scss';

function Home(){
    return(
        <div className={style.homePage}>
            <Header/>
            <Search/>
            <StorageList/>
        </div>
    );
}

export default Home;