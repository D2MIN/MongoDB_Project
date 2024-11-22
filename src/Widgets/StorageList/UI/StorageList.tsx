import React, { useEffect, useState } from "react";
import style from "./StorageList.module.scss";
import StorageCard from "../../StorageCard/UI/StorageCard.tsx";
import { GetAllStorage } from "../BL/GetAllStorage.js";
import { StorageInfoI } from "../../../Shared/Interfaces/AllInterfaces.tsx";
import {GetData} from '../../Search/BL/GetData.js'

interface StorageListPropI{
    searchTitle : string;
}

function StorageList({searchTitle} : StorageListPropI){

    const [allStorage, setAllStorage] = useState<StorageInfoI[]>();

    useEffect(()=>{
        if(searchTitle == ""){
            GetAllStorage().then((allStorage) => setAllStorage(allStorage));
        }else{
            GetData(searchTitle).then((allStorage) => setAllStorage(allStorage));
        }
    },[searchTitle]);
    
    return(
        <div className="storageListSection">
            {allStorage?.map((el)=>{
                return <StorageCard key={el.id} id={el.id} img={el.img} name={el.name} adress={el.adress} aboutInfo={el.aboutInfo} countCar={el.countCar}/>
            })}
        </div>
    );
}

export default StorageList;