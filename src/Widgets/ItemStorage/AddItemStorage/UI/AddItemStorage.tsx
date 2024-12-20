import React, { useContext, useEffect, useState } from 'react'
import style from './AddItemStorage.module.scss';
import StorageContext from '../../../../App/StorageInfo/BL/useStorageContext.tsx';
import { FetchDataItem } from '../BL/FetchDataItem.tsx';
import { useNavigate } from 'react-router';

// IMG название количество вес описание

export function AddItemStorage(){

    const [itemName, setItemName] = useState<string>('');
    const [itemDescript, setItemDescript] = useState<string>('');
    const [itemCount, setItemCount] = useState<number>();
    const [itemW, setItemW] = useState<number>();

    const navigate = useNavigate();
    const [storageId, setStorageId] = useState();
    const {data,setData} = useContext(StorageContext);
    const [imageSrc, setImageSrc] = useState<string>('');

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setImageSrc(reader.result as string);
          };
          reader.readAsDataURL(file);
        }
    };

    useEffect(()=>{
        setStorageId(data._id);
    }, [data])

    function clearState(){
        setItemName('');
        setItemDescript('');
        setItemW(0);
        setItemCount(0);
        setImageSrc('');
    }

    function addItem(event){
        event.preventDefault();
        if( isNaN(itemCount) || isNaN(itemW)){
            console.log('Может напишешь нормальные числа ? ');
            return(0);
        }
        if(itemName == '' || itemCount == 0 || itemW == 0){
            return(0)
        }
        const res = FetchDataItem(itemName,itemDescript,imageSrc,itemW, itemCount, storageId);
        clearState();   
        
    }

    return(
        <div className={style.AddItemStorage}>
            <form className={style.addItemForm}>
                <div className={style.upForm}>
                    <div className={style.imgItemSection}>
                        <input type="file" accept="image/*" onChange={handleImageUpload}/>
                        {imageSrc && 
                            <div className={style.selectedImgSection}>
                                <img src={imageSrc} alt="Preview" className={style.selectedImg} />
                            </div>
                        }
                    </div>
                    <div className={style.infoItemSection}>
                        <input
                            className={style.nameItem} 
                            type="text" 
                            placeholder='Название'
                            value={itemName}
                            onChange={(e)=>setItemName(e.target.value)}
                         />
                        <input
                            className={style.numberItem} 
                            type="number" 
                            placeholder='Число'
                            value={itemCount}
                            onChange={(e)=>setItemCount(Number(e.target.value))}
                         />
                        <input
                            className={style.itemW} 
                            type="number"
                            placeholder='Вес'
                            value={itemW}
                            onChange={(e)=>setItemW(Number(e.target.value))}
                         />
                    </div>
                </div>
                <div className={style.descriptItem}>
                    <textarea 
                        className={style.area} 
                        placeholder='Описание товара'
                        value={itemDescript}
                        onChange={(e)=>setItemDescript(e.target.value)}
                        ></textarea>
                </div>
                <div className={style.buttonSection}>
                    <button 
                        className={style.addItemBtn}
                        onClick={(event)=>addItem(event)}
                    >
                        Добавить товар
                    </button>
                </div>
            </form>
        </div>
    )
}