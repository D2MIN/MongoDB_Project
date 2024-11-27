import React from "react";
import style from "./StorageCard.module.scss";
import { Button } from "../../../Shared/Button/Button.tsx";
import byttonStyle from '../../../Shared/GlobalStyle/ButtonStyle.module.scss';
import { useNavigate } from "react-router";
import StorageInfo from "../../../App/StorageInfo/UI/StorageInfo.tsx";

interface StorageInfoI{
    id : number,
    img : String
    name : string,
    adress : string,
    aboutInfo : string,
    countCar : number,
}


function StorageCard({id,img,name,adress,aboutInfo,countCar}:StorageInfoI){
    
    const navigate = useNavigate();

    return(
        <div className={style.storage}>
            <div className={style.storageSection}>
                <div className={style.storageImg}>
                    <img src={img.toString()} alt="Фото склада" />
                </div>
                <div className={style.storageInfo}>
                    <div className={style.storageNameSection}>
                        <div className={style.storageName}>
                            <p>{name}</p>
                        </div>
                        <div className={style.storageAdress}>
                            <p>{adress}</p>
                        </div>
                    </div>
                    <div className={style.storageAbout}>
                        <p>
                            {aboutInfo}
                        </p>
                    </div>
                    <div className={style.anoserSection}>
                        <div className={style.carCount}>
                            <p>Колличество машин: {countCar || 0}</p>
                        </div>
                        <button 
                            className={byttonStyle.button}
                            onClick={()=>navigate(`/storageInfo/${id}`)}
                        >
                            Просмотр
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StorageCard;