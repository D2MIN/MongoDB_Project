import React from "react";
import style from './ViewCar.module.scss'
import { Car } from "../../Car/UI/Car.tsx";

export function ViewCarStorage(){
    return(
        <div className={style.VieCarStorage}>
            <div className={style.carsSection}> 
                <Car id={'123'} name={'Goog'} capacity={200}/>
                
            </div>
        </div>
    )
}