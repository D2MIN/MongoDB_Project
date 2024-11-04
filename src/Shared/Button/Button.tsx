import style from "./Button.module.scss";
import React from "react";

interface ButtonPropI{
    title : string;
}

export function Button({title}:ButtonPropI){
    return(
        <button
            className={style.button}
        >
                {title}
        </button>
    );
}