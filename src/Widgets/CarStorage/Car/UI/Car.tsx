import React, { useContext } from "react";
import style from './Car.module.scss'
import { DeleteCar } from "../BL/DeleteCar.ts";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";

export function Car(props : {id:string,name:string,capacity:number}){

    const {data,setData} = useContext(StorageContext);
    function remove(){
        DeleteCar(data._id, props.id);
    }

    return(
        <div key={props.id} className={style.Car}>
            <div className={style.carSection}>
                <p className={style.name}>Название: {props.name}</p>
                <p className={style.capacity}>Вместимость: {props.capacity}кг</p>
                <button 
                    className={style.deleteBtn}
                    onClick={()=>{remove()}}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}