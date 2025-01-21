import React, { JSXElementConstructor, ReactElement, useState } from "react";
import style from './DiliveriItemStyle.module.scss';
import GetItems from "../BL/GetItems.ts";
import {Items} from './Items/Items.tsx';
import { AcceptItem } from "../BL/AcceptItem.ts";

export function DiliveriItem(props:{storageId:string, carID : string, carNumber : string, comingDate : number, comingMonth : number, comingYear: number}){

    const [items, setItems] = useState([]);
    const [popupFlag, setPopupFlag] = useState(false);
    const [itemsLict, setItemList] = useState<ReactElement[]>([]);

    async function acceptDelivery(){
        const res = await AcceptItem(props.carID,props.storageId);
        console.log(res);
    }

    async function checkItems(){
        const AllItems = await GetItems(props.carID);
        setItems(await AllItems);
        setPopupFlag(!popupFlag);

        let list : ReactElement[] = [];
        AllItems.forEach((elem)=>{
            list.push(<Items path={elem.imgPath} name={elem.name} count={elem.itemCount}/>)
        });
        setItemList(list);
    }

    return(
        <div className={style.deliveriItems}>

        {popupFlag && 
            <div 
                onClick={()=>{setPopupFlag(!popupFlag)}}
                className={style.popup__wrapper}
            >
                <div className={style.popup}>
                    <div className={style.popup__section}>
                        {itemsLict}
                    </div>
                </div>
            </div>
        }

            <div className={style.deliveriItem}>
                <div className={style.deliveriItem__info}>
                    <div className={style.deliveriItem__info__rigthBlock}>
                        <p>Номер машины : {props.carNumber}</p>
                        <p>Дата прибыития : {props.comingDate +'.'+ props.comingMonth +'.'+ props.comingYear}</p>
                    </div>
                </div>
                <div className={style.deliveriItem__buttons}>
                    <button 
                        className={style.button__accept}
                        onClick={()=>acceptDelivery()}
                    >
                        Принять машину
                    </button>
                    <button
                        className={style.button__content}
                        onClick={() => checkItems()}
                    >
                        Содержимое
                    </button>
                </div>
            </div>
        </div>
    )
}