import React, { ReactElement, useContext, useEffect, useRef, useState } from "react";
import style from './ViewCar.module.scss'
import { Car } from "../../Car/UI/Car.tsx";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";
import { GetAllStorage } from "../../../StorageList/BL/GetAllStorage.js";
import { parsePath } from "react-router";

export function ViewCarStorage(){

    const [popapFlag, setPopapFlag] = useState<boolean>(false)
    const {data,setData} = useContext(StorageContext);
    const [carsList, setCarList] = useState<React.JSX.Element []>([]);

    const [popapCarName, setPopapCarName] = useState<string>('');
    const [popapCarWeight, setPopapCarWeight] = useState<number>(0);
    const [popapCarLoad, setPopapCarLoad] = useState<number>(0);
    const [AllStorage, setAllStorage] = useState<any>();

    const [itemStatus, setItemStatus] = useState({});
    const [itemStatusBackap, setItemStatusBackap] = useState({});
    const [load, setLoad] = useState<number>(0);

    const [selectStorage, setSelectStorage] = useState<boolean | string>(false);
    
    useEffect(()=>{

        GetAllStorage(data.userLogin).then((allStorage) => setAllStorage(allStorage));

        if(data.cars == undefined){
            console.log('Данные загружаются');
        }
        else{
            const AllCars = data.cars;
            let carsList : React.JSX.Element[] = [];
            AllCars.forEach(car => {
                if(car.carName != undefined && car.carWeight != undefined){
                    carsList.push(
                        <Car 
                            id = {car._id} 
                            name = {car.carName} 
                            capacity = {car.carWeight} 
                            popupChanger = {setPopapFlag} 
                            setPopapCarName = {setPopapCarName}
                            setPopapCarLoad = {setPopapCarWeight}
                        />
                    )
                }
            });
            setCarList(carsList);
            
            const allProduct = data.product;
            allProduct.forEach((el)=>{
                if(el.name != undefined){
                    itemStatusBackap[`${el._id}`] == undefined ? 
                        setItemStatusBackap(prevState => ({
                            ...prevState,
                            [`${el._id}`]: el.itemCount
                        })) : 
                        setItemStatusBackap(prevState => ({
                            ...prevState,
                            [`${el._id}`]: prevState[`${el._id}`]
                        }));
                }
            });
            setItemStatus(itemStatusBackap);
            setLoad(0);
            setSelectStorage(false);
        }
    },[data, popapFlag]);

    function getProducts(){
        const allProduct = data.product;
        let viewProduclList : React.JSX.Element[] = [];
        
        allProduct.forEach((el)=>{
            if(el.name != undefined){
                viewProduclList.push(
                    <div key={el._id} className={style.item}>
                        <p className={style.itemName}>Название - {el.name}</p>
                        <p className={style.itemName}>Колличество - {el.itemCount}</p>
                        <p className={style.itemName}>Вес - {el.itemW}</p>
                        <button 
                            className={style.addItemBtn} 
                            onClick={()=>{
                                setItemStatus(prevState => ({
                                    ...prevState,
                                    [`${el._id}`]: prevState[`${el._id}`] - 1
                                }));
                                setLoad(load + el.itemW);
                            }} 
                            disabled={itemStatus[`${el._id}`] > 0 ? false : true}
                        >
                            Добавить
                        </button>
                    </div>
                );
            }
        });

        return (viewProduclList);
    };

    function getStorages(){
        let viewStorageList : React.JSX.Element[] = [];
        AllStorage.forEach((el)=>{
            viewStorageList.push(
                <div key={el._id} className={`${style.storage} ${selectStorage == el.id ? style.greenBg : style.grayBg}`}>
                    <p className={style.storageName}>{el.name}</p>
                    <button 
                        className={style.selectStorage}
                        onClick={()=>{
                            setSelectStorage(el.id)
                        }}
                        disabled = {selectStorage == false ? false : true}
                    >
                        Выбрать
                    </button>
                </div>
            );
        });
        return viewStorageList;
    };

    return(
        <div className={style.VieCarStorage}>
            
            {popapFlag == false ? '' : 
                <div className={style.popapSection}>
                    <div className={style.popap}>
                        <div className={style.carinfo}>
                            <p className={style.carName}>Название: {popapCarName} </p>
                            <p className={style.carWeight}>Вместимость: {popapCarWeight}</p>
                            <p className={`${style.carWeight} ${load > popapCarWeight ? style.redW : style.G}`}>Нагрузка: {load}кг</p>
                        </div>
                        <div className={style.storageItems}>
                            <h1>Выберите предметы для перевозки</h1>
                            {getProducts()}
                        </div>
                        <div className={style.allStorages}>
                            <h1>Выберите склад для перевозки</h1>
                            {getStorages()}
                        </div>
                        <div className={style.btnSection}>
                            <button 
                                className={style.subBtn}
                            >
                                Отправить
                            </button>
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