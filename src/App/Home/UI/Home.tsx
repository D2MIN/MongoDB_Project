import React, { useState } from "react";
import Header from "../../../Widgets/Header/UI/Header.tsx";
import Search from "../../../Widgets/Search/UI/Search.tsx";
import StorageList from "../../../Widgets/StorageList/UI/StorageList.tsx";
import style from './Home.module.scss';

function Home(){

    const [searchTitle, setSearchTitle] = useState<string>('');
    function getSearch(title : string){
        setSearchTitle(title);
    }

    return(
        <div className={style.homePage}>
            <Header/>
            <Search getSearch={getSearch} />
            <StorageList searchTitle={searchTitle}/>
        </div>
    );
}

export default Home;