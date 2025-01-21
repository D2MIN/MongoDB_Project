import React, { JSXElementConstructor, ReactElement, ReactHTMLElement, useContext, useEffect, useState } from "react";
import style from './SearchItemForm.module.scss';
import { GetSearchItem } from "../BL/GetSeacrhItem.ts";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";
import { Item } from "../../Item/UI/Item.tsx";

export function SearchItemForm(props:{products,setSearchItemList,setSearchStatus}){
    const [itemName, setItemName] = useState<string>('');
    const {data,setData} = useContext(StorageContext);
    const [product,setProduct] = useState([]);
    const [apdate,setApdate] = useState(0);

    async function GetReq(itemName){
        const storageId = data._id;
        let arrayWordsSearch = itemName.split(' ').filter(elem => elem != '');
       
        let searchProduct = product.filter((product) => 
            arrayWordsSearch.some((word) => {
                return (product.name.toLowerCase()).includes(word.toLowerCase());
            })
        );
        if(searchProduct.length > 0){
            let itemArr : ReactElement[] = [];
            let img = '';
            props.setSearchStatus(true);
            searchProduct.forEach((elem)=>{
                if(elem.name != undefined){
                    if(elem.imgPath == ''){
                        img = 'https://cdn1.ozone.ru/s3/multimedia-m/6579525802.jpg';
                    }else{
                        img = elem.imgPath;
                    }
                    itemArr.push(
                        Item(
                            data._id,
                            elem._id,
                            elem.name,
                            elem.about,
                            elem.itemCount,
                            elem.itemW,
                            img
                        )
                    );
                }
            });
            props.setSearchItemList(itemArr);
        }else{
            props.setSearchStatus(false);
        }
    }

    useEffect(()=>{
        if(props.products != undefined && props.products.length > 0){
            const products = props.products;
            products.shift();
            setProduct(products);
        }else{
            setApdate(() => apdate + 1);
        }
    },[apdate]);

    return(
        <div className={style.serchSection}>
            <input 
                className={style.search}
                type="text"
                placeholder="Поиск товара по имени"
                onChange={(event)=>setItemName(event.target.value)}
            />
            <button 
                className={style.searchBtn}
                onClick={() => GetReq(itemName)}
            >
                Найти товар
            </button>
        </div>
    )
}