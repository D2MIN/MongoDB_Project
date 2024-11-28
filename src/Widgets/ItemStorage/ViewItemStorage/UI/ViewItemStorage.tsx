import React, { useContext, useEffect, useState } from "react";
import style from './ViewItemStorage.module.scss';
import { useParams } from "react-router";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";

export function ViewItemStorage(){

    const {data,setData} = useContext(StorageContext);

    const [dataLength, setDataLength] = useState<number>(data.length);
    const [items,setItems] = useState<React.JSX.Element[]>([])

    useEffect(()=>{
        const fetchData = async()=>{
            const itemArr : React.JSX.Element[] = [];
            const product = await data.product;
            console.log(product)
            if(product != undefined || product[1].name != undefined){
                product.forEach((elem)=>{
                    if(elem.name != undefined){
                        itemArr.push(
                            <div key={data._id} className={style.item}>
                                    <div className={style.itemTitle}>
                                        <div className={style.itemName}>
                                            {elem.name}
                                        </div>
                                        <div className={style.itemDescript}>
                                            {elem.about}               
                                        </div>
                                        <button className={style.deleteBtn}>Удалить</button>
                                    </div>
                                    <div className={style.itemInfo}>
                                        <div className={style.info}>
                                            <p>Колличество: {elem.itemCount}</p>
                                            <p>Вес в кг: {elem.itemW}</p>
                                        </div>
                                        <div className={style.itemImg}>
                                            <img className={style.Img} src={elem.imgPath} alt="IMG" />
                                        </div>
                                    </div>
                                </div>
                        );
                    }
                });
            }
            setItems(itemArr);
        }
        fetchData();
    },[data,dataLength])

    return(
        <div className={style.ViewItemStorage}>
            <div className={style.serchSection}>
                <input className={style.search} type="text" placeholder="Поиск товара по имени"/>
                <button className={style.searchBtn}>Найти товар</button>
            </div>
            {items.length > 0 ? 
                <div className={style.viewSection}>
                    <div className={style.view}>
                        {items} 
                    </div>
                </div>
                : 
                <div className={style.EmptyStorageTitle}>Склад пуст</div>
            }
        </div>
    )
}