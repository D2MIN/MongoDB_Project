import React, { useContext, useEffect, useState } from "react";
import style from './ViewItemStorage.module.scss';
import { useParams } from "react-router";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";
import { Item } from "../../Item/UI/Item.tsx";

export function ViewItemStorage(){

    const {data,setData} = useContext(StorageContext);
    const [productCount,setProductCount] = useState();
    const [items,setItems] = useState<React.JSX.Element[]>([])

    useEffect(()=>{
        const fetchData = async()=>{
            const itemArr : React.JSX.Element[] = [];
            const product = await data.product;
            if(product != undefined){
                product.forEach((elem)=>{
                    if(elem.name != undefined){
                        itemArr.push(
                            Item(
                                productCount,
                                setProductCount,
                                data._id,
                                elem._id,
                                elem.name,
                                elem.about,
                                elem.itemCount,
                                elem.itemW,
                                elem.imgPath
                            )
                        );
                    }
                });
            }
            setItems(itemArr)
        };
        fetchData();
    },[data])

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