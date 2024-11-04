import React, { useEffect, useState } from "react";
import style from "./StorageList.module.scss";
import StorageCard from "../../StorageCard/UI/StorageCard.tsx";
import { GetAllStorage } from "../BL/GetAllStorage.js";

interface StorageInfoI{
    id : number,
    name : string,
    adress : string,
    aboutInfo : string,
    countCar : number,
}

function StorageList(){

    const [allStorage, setAllStorage] = useState<StorageInfoI[]>();

    useEffect(()=>{
        GetAllStorage().then((allStorage) => setAllStorage(allStorage));
    },[]);
    
    return(
        <div className="storageListSection">
            {allStorage?.map((el)=>{
                return <StorageCard key={el.id} id={el.id} name={el.name} adress={el.adress} aboutInfo={el.aboutInfo} countCar={el.countCar}/>
            })}
        </div>
    );
}

export default StorageList;