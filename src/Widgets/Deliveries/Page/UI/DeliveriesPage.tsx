import React, { useEffect, useState } from "react";
import style from './DeliveriesStyle.module.scss';
import { DiliveriItem } from "../../DeliveriItem/UI/DiliveriItem.tsx";
import { GetSendCar } from "../BL/GetSendCar.tsx";
import { useContext } from "react";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";

function DeliverisPage(){
    const {data,setData} = useContext(StorageContext);
    const [sendCars, setSendCars] = useState();
    
    useEffect(()=>{
        async function getSendCar(){
            if(data._id != undefined){
                const res = await GetSendCar(data._id);
                setSendCars(res);
                console.log(res);
            }
        }
        getSendCar();
    },[data]);

    function createListSendCars(){
        let list : React.ReactNode[] = [];
        sendCars.forEach(carInfo => {
            list.push(
                <DiliveriItem storageName='Название склада' storageAddress='Адресс склада' carNumber={carInfo.carName} comingData={carInfo.carDate}/>
            )
        });
        return(list);
    }

    return(
        <div className={style.DeliveriPage}>
            <div className={style.deliveriSection}>
                <h1 className={style.deliveriSection__titile}>Доставки из других складов</h1>
                    {sendCars && createListSendCars()}
            </div>
        </div>
    )
}

export default DeliverisPage;