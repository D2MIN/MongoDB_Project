import React, {ReactElement, useContext, useEffect, useState } from "react";
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
                    if(product.name == undefined){
                        return false
                    }else{
                        return (product.name.toLowerCase()).includes(word.toLowerCase());
                    }
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
                        <Item
                            key = {data.id}
                            storageId = {data._id}
                            itemId = {elem._id}
                            name = {elem.name}
                            descript = {elem.about}
                            count = {elem.itemCount}
                            itemW = {elem.itemW}
                            itemImg = {img}
                        />
                    );
                }
            });
            props.setSearchItemList(itemArr);
        }else{
            props.setSearchStatus(false);
        }
    }

    async function WaitData(){
        if(props.products != undefined && props.products.length > 0){
            const products = await props.products;
            setProduct(products);
        }
        return true;
    }

    useEffect(()=>{
        const status = WaitData();
    },);

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