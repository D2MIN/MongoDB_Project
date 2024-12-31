import React from "react";
import style from './DiliveriItemStyle.module.scss';

export function DiliveriItem(props:{carNumber, comingDate, comingMonth, comingYear}){
    return(
        <div className={style.deliveriItems}>
            <div className={style.deliveriItem}>
                <div className={style.deliveriItem__info}>
                    <div className={style.deliveriItem__info__rigthBlock}>
                        <p>Номер машины : {props.carNumber}</p>
                        <p>Дата прибыития : {props.comingDate +'.'+ props.comingMonth +'.'+ props.comingYear}</p>
                    </div>
                </div>
                <div className={style.deliveriItem__buttons}>
                    <button className={style.button__accept}>
                        Принять машину
                    </button>
                    <button className={style.button__content}>
                        Содержимое
                    </button>
                </div>
            </div>
        </div>
    )
}