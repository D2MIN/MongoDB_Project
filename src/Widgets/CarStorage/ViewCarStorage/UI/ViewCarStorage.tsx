import React, { useContext, useEffect, useState } from "react";
import style from './ViewCar.module.scss'
import { Car } from "../../Car/UI/Car.tsx";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";

export function ViewCarStorage(){

    const {data,setData} = useContext(StorageContext);
    const [carsList, setCarList] = useState<React.JSX.Element []>([]);
    
    useEffect(()=>{
        if(data.cars == undefined){
            console.log('Данные загружаются');
        }
        else{
            const AllCars = data.cars;
            let carsList : React.JSX.Element[] = [];
            AllCars.forEach(car => {
                if(car.carName != undefined && car.carWeight != undefined){
                    carsList.push(
                        <Car id={car._id} name={car.carName} capacity={car.carWeight}/>
                    )
                }
            });
            setCarList(carsList);
        }
    },[data]);

    return(
        <div className={style.VieCarStorage}>
            <div className={style.carsSection}> 
                {
                    carsList.length != 0 ? carsList : <div className={style.EmptyCars}>Машин на складе нет</div>
                }
            </div>
        </div>
    )
}