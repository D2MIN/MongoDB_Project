import React, { createContext, useContext, useEffect, useState } from "react";
import style from "./StorageInfo.module.scss";
import Header from '../../../Widgets/Header/UI/Header.tsx'
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { set } from "mongoose";
import { getStorageInfo } from "../BL/GetStorageInfo.tsx";
import StorageContext from '../BL/useStorageContext.tsx';

function StorageInfo(){

    const [data,setData] = useState<object>({})

    const [activeLinkList,setActiveLinkList] = useState<number[]>([1,0,0,0]);
    const [storageImg, setStorageImg] = useState<string>('');
    const [storageName, setStorageName] = useState<string>('');
    const [storageAdress, setStorageAdress] = useState<string>('');
    const [storageDescription, setStorageDescription] = useState<string>('');
    
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fethData = async () => {
            const response = await getStorageInfo(id);
            if (!response) {
                console.error("Ошибка: ответ не получен");
                return; // Добавлено для обработки случая, когда response неопределен
            }
            const data = await response.json();
            setData(data);
            // console.log(data);
            setStorageImg(data.img);
            setStorageName(data.name);
            setStorageAdress(data.street);
            setStorageDescription(data.about);
        }
        fethData()
    },[])

    async function deleteStorage(){
        const response = await fetch(`http://localhost:8080/api/delete/storage/${id}`, { method: 'DELETE' });
        try{
            if(!response.ok) {
                throw new Error("Ошибка при удалении документа");
            }
            navigate("/");
        } catch (error) {
            console.error("Ошибка:", error);
        }
    }

    return(
        <div className={style.StorageInfo}>
            <Header/>
            
            <div className={style.infoSection}>
                <div className={style.name}>{storageName}</div>
                <div className={style.aboutContent}>
                    <img 
                        className={style.storageImg}
                        src={storageImg}
                        alt=""
                    />
                    <div className={style.leftAboutContent}>
                        <div className={style.adress}>Адрес: {storageAdress}</div>
                        <div className={style.descript}>Описание: {storageDescription}</div>
                        <button 
                            className={style.delete}
                            onClick={()=>deleteStorage()}
                        >
                            УДАЛИТЬ СКЛАД
                        </button>
                    </div>
                </div>
            </div>
            <div className={style.storageEntrails}>
                <div className={style.categories}>
                    <div className={style.viewItems}>
                        <Link 
                            to='./'
                            className={`${style.link} ${activeLinkList[0] ? style.activeLink : ''}`}
                            onClick={()=>setActiveLinkList([1,0,0,0])}
                        >Просмотр товаров
                        </Link>
                    </div>
                    <div className={style.viewCars}>
                        <Link 
                            to='addItem'
                            className={`${style.link} ${activeLinkList[1] ? style.activeLink : ''}`}
                            onClick={()=>setActiveLinkList([0,1,0,0])}
                        >Добавить товар
                        </Link>
                    </div>
                    <div className={style.addItems}>
                        <Link 
                            to='viewCars'
                            className={`${style.link} ${activeLinkList[2] ? style.activeLink : ''}`}
                            onClick={()=>setActiveLinkList([0,0,1,0])}
                        >Просмотр машин
                        </Link>
                    </div>
                    <div className={style.addCars}>
                        <Link 
                            to='addCars'
                            className={`${style.link} ${activeLinkList[3] ? style.activeLink : ''}`}
                            onClick={()=>setActiveLinkList([0,0,0,1])}
                        >Добавить машину
                        </Link>
                    </div>
                </div>
                <div className={style.StorageOutlet}>
                    <StorageContext.Provider value={{data,setData}}>
                        <Outlet />
                    </StorageContext.Provider>
                </div>
            </div>

        </div>
    )
}

export default StorageInfo;