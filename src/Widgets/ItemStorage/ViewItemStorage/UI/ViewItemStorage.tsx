import React, { useContext, useEffect, useState } from "react";
import style from './ViewItemStorage.module.scss';
import { useParams } from "react-router";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";
import { Item } from "../../Item/UI/Item.tsx";
import { SearchItemForm } from "../../SearchForm/UI/SearchItemForm.tsx";

export function ViewItemStorage(){

    const {data,setData} = useContext(StorageContext);
    const [items,setItems] = useState<React.JSX.Element[]>([])
    const [products, setProduct] = useState([]);
    const [searchItemList, setSearchItemList] = useState([]);
    const [searchStatus, setSearchStatus] = useState<boolean>(false);

    useEffect(()=>{
        const fetchData = async()=>{
            const itemArr : React.JSX.Element[] = [];
            const product = await data.product;
            setProduct(product);
            if(product != undefined){
                let img = '';
                product.forEach((elem)=>{
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
            }
            
            setItems(itemArr);
        };
        fetchData();
    },[data]);

    return(
        <div className={style.ViewItemStorage}>
            <SearchItemForm products={products} setSearchItemList={setSearchItemList} setSearchStatus={setSearchStatus}/>
            {items.length > 0 ? 
                <div className={style.viewSection}>
                    <div className={style.view}>
                        {searchStatus ? searchItemList : items} 
                    </div>
                </div>
                : 
                <div className={style.EmptyStorageTitle}>Склад пуст</div>
            }
        </div>
    )
}