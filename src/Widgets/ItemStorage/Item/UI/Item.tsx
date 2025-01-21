import React from "react";
import style from './Item.module.scss';
import { DeleteItem } from "../BL/DeleteItem.ts";
import { useNavigate } from "react-router-dom";

export function Item(props: {storageId,itemId,name,descript,count,itemW, itemImg, setRefresh}){

    function deleteItem(){
        console.log(props.key, props.storageId);
        // DeleteItem(props.key,props.storageId);
        props.setRefresh(props.key);
    }

    return(
        <div key={props.key} className={style.item}>
            <div className={style.itemTitle}>
                <div className={style.itemName}>
                    {props.name}
                </div>
                <div className={style.itemDescript}>
                    {props.descript}               
                </div>
                <button
                    className={style.deleteBtn}
                    onClick={()=> deleteItem()}
                >
                    Удалить
                </button>
            </div>
            <div className={style.itemInfo}>
                <div className={style.info}>
                    <p>Колличество: {props.count}</p>
                    <p>Вес в кг: {props.itemW}</p>
                </div>
                <div className={style.itemImg}>
                    <img className={style.Img} src={props.itemImg} alt="IMG" />
                </div>
            </div>
        </div>
    );
}