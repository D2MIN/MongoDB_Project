import React from 'react';
import style from './Items.module.scss';

export function Items(props:{path, name, count}){

    let imgPath = props.path || "https://cdn1.ozone.ru/s3/multimedia-m/6579525802.jpg";
    return(
        <div className={style.itemSection}>
            <div className={style.item}>
                <div className={style.img}>
                    <img src={imgPath} alt="Фото" />
                </div>
                <div className={style.info}>
                    Количество: {props.count}
                    <br></br>
                    Название: {props.name}
                </div>
            </div>
        </div>
    )
}