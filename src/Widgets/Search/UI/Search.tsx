import { useState } from "react";
import style from "./Search.module.scss";
import React from "react";
import { Button } from "../../../Shared/Button/Button.tsx";
import buttonStyle from '../../../Shared/GlobalStyle/ButtonStyle.module.scss';

interface SearchPropI{
    getSearch : (string)=>void;
}

function Search({getSearch} : SearchPropI){

    const [inputValue,setInputValue] = useState<string>('');

    return(
        <div className={style.searchSection}>
            <div className={style.inputContener}>
                <input 
                    onChange={(event)=>setInputValue(event.target.value)}
                    className={style.searchInput}
                    value={inputValue}
                    placeholder="Поиск склада по названию"
                />{inputValue &&
                    <button 
                        className={style.clearSearchLable}
                        onClick={()=>{
                            setInputValue('');
                            getSearch('');
                            }}
                    ></button>
                }
            </div>
                <button 
                    className={buttonStyle.button}
                    onClick={()=>getSearch(inputValue)}
                >
                    Найти склад
                </button>
        </div>
    );
}

export default Search;