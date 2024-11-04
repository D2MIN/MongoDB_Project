import React from "react";
import style from "./StorageCard.module.scss";
import { Button } from "../../../Shared/Button/Button.tsx";

interface StorageInfoI{
    id : number,
    name : string,
    adress : string,
    aboutInfo : string,
    countCar : number,
}

function StorageCard({id, name,adress,aboutInfo,countCar}:StorageInfoI){
    return(
        <div className={style.storage}>
            <div className={style.storageSection}>
                <div className={style.storageImg}>
                    <img src="https://avatars.mds.yandex.net/i?id=da0bae1c20201e937cadeb31b1e3066d_l-5579535-images-thumbs&n=13" alt="Фото склада" />
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
                        <Button title="Просмотр"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StorageCard;