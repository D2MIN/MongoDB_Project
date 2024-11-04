import { useState } from "react";
import style from "./Search.module.scss";
import React from "react";
import { Button } from "../../../Shared/Button/Button.tsx";

function Search(){
    const [inputValue,setInputValue] = useState<string>('');

    return(
        <div className={style.searchSection}>
                <input 
                    onChange={(event)=>setInputValue(event.target.value)}
                    className={style.searchInput}
                    placeholder="Поиск склада по названию"
                />
                <Button title="Найти склад"/>
        </div>
    );
}

export default Search;