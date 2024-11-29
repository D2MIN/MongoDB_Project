import React from "react";
import style from './Item.module.scss';
import { DeleteItem } from "../BL/DeleteItem.tsx";
import { useNavigate } from "react-router-dom";

export function Item(productCount, setProductCount, storageId, key,name,descript,count,itemW, itemImg){

    function deleteItem(){
        DeleteItem(key,storageId);
    }

    return(
        <div key={key} className={style.item}>
            <div className={style.itemTitle}>
                <div className={style.itemName}>
                    {name}
                </div>
                <div className={style.itemDescript}>
                    {descript}               
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
                    <p>Колличество: {count}</p>
                    <p>Вес в кг: {itemW}</p>
                </div>
                <div className={style.itemImg}>
                    <img className={style.Img} src={itemImg} alt="IMG" />
                </div>
            </div>
        </div>
    );
}