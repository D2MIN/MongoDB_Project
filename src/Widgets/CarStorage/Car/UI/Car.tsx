import React from "react";
import style from './Car.module.scss'

export function Car(props : {id:string,name:string,capacity:number}){
    return(
        <div key={props.id} className={style.Car}>
            <div className={style.carSection}>
                <p className={style.name}>Название: {props.name}</p>
                <p className={style.capacity}>Вместимость: {props.capacity}кг</p>
                <button 
                    className={style.deleteBtn}
                >
                    Удалить
                </button>
            </div>
        </div>
    )
}