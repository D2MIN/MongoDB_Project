import React, { useContext, useEffect, useState } from "react";
import style from './ViewCar.module.scss'
import { Car } from "../../Car/UI/Car.tsx";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";

export function ViewCarStorage(){

    const [popapFlag, setPopapFlag] = useState<boolean>(false)
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
                        <Car id={car._id} name={car.carName} capacity={car.carWeight} popupChanger={setPopapFlag}/>
                    )
                }
            });
            setCarList(carsList);
        }
    },[data]);

    return(
        <div className={style.VieCarStorage}>
            
            {popapFlag == false ? '' : 
                <div className={style.popapSection}>
                    <div className={style.popap}>
                        <div className={style.carinfo}>
                            <p className={style.carName}>Название: SupremN </p>
                            <p className={style.carWeight}>Вместимость: 200кг</p>
                            <p className={style.carWeight}>Нагрузка: 0кг</p>
                        </div>
                        <div className={style.storageItems}>
                            <h1>Выберите предметы для перевозки</h1>


                            <div className={style.item}>
                                <p className={style.itemName}>Беспроводной утюг</p>
                                <button className={style.addItemBtn}>Добавить</button>
                            </div>
                            <div className={style.item}>
                                <p className={style.itemName}>Ноутбук ASUS</p>
                                <button className={style.addItemBtn}>Добавить</button>
                            </div>
                            <div className={style.item}>
                                <p className={style.itemName}>Стиральная машина</p>
                                <button className={style.addItemBtn}>Добавить</button>
                            </div>


                        </div>
                        <div className={style.allStorages}>
                            <h1>Выберите склад для перевозки</h1>

                            <div className={style.storage}>
                                <p className={style.storageName}>Склад номер 3</p>
                                <button className={style.selectStorage}>Выбрать</button>
                            </div>
                            <div className={style.storage}>
                                <p className={style.storageName}>Склад восточка</p>
                                <button className={style.selectStorage}>Выбрать</button>
                            </div>
                            <div className={style.storage}>
                                <p className={style.storageName}>Склад беломор канал 9</p>
                                <button className={style.selectStorage}>Выбрать</button>
                            </div>


                        </div>
                        <div className={style.btnSection}>
                            <button className={style.subBtn}>Отправить</button>
                            <button 
                                onClick={()=>{setPopapFlag(false)}}
                                className={style.closeBtn}
                            >
                                Закрыть
                            </button>
                        </div>
                    </div>
                </div>
            }
            
            <div className={style.carsSection}> 
                {
                    carsList.length != 0 ? carsList : <div className={style.EmptyCars}>Машин на складе нет</div>
                }
            </div>
        </div>
    )
}