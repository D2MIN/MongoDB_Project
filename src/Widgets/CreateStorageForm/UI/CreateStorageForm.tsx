import React, { useEffect, useState } from "react";
import style from './CreateStorageForm.module.scss';
import {Button} from '../../../Shared/Button/Button.tsx'
import { ButtonPostFuncI, StorageCreateInfo } from "../Interfaces/AllInterfaces";
import byttonStyle from '../../../Shared/GlobalStyle/ButtonStyle.module.scss';

function CreateStorageForm(){

    const [imageSrc, setImageSrc] = useState<string>('');
    const [storageName, setStorageName] = useState<string>('');
    const [storageDescript, setStorageDescript] = useState<string>('');
    const [storageAdress, setStorageAdress] = useState<string>('');
    const [switchByClearForm, setswitchByClearForm] = useState<boolean>(false);

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

    function PostData(name, about, adress, img){
        fetch('http://localhost:8080/api/post/newstorage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Задаем тип контента как JSON
            },
            body: JSON.stringify({ name: name, about: about, adress: adress, img : img}), // Преобразуем данные в JSON-строку
          })
            .then(response => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json(); // Парсим JSON-ответ от сервера
            })
            .then(data => {
              console.log('Success:', data); // Обрабатываем полученные данные
            })
            .catch(error => {
              console.error('Error:', error); // Обрабатываем ошибки
            });
          
    };

    function ButtonClick(name, about, adress, img){
      if(name != '' && about != '' && adress != '' && img != ''){
        PostData(storageName, storageDescript, storageAdress, imageSrc);
        setImageSrc('');
        setStorageName('');
        setStorageDescript('');
        setStorageAdress('');
      }else{
        console.log('Пустые поля');
      }
    }

    return(
        <div className={style.createStorageForm}>
            <div className={style.createStorageFormSection}>
                <div className={style.uploadImg}>
                    <input type="file" accept="image/*" onChange={handleImageUpload}/>
                    {imageSrc && 
                        <div className={style.selectedImgSection}>
                            <img src={imageSrc} alt="Preview" className={style.selectedImg} />
                        </div>
                    }
                </div>
                <div className={style.StorageInfo}>
                    <input 
                        className={style.input}
                        placeholder="Название склада"
                        value={storageName}
                        type="text"
                        onChange={(event)=>setStorageName(event.target.value)}
                    />
                    <textarea 
                        className={style.textarea}
                        placeholder="Описание склада"
                        value={storageDescript}
                        onChange={(event)=>setStorageDescript(event.target.value)}
                    ></textarea>
                    <input 
                        className={style.input}
                        placeholder="Адрес склада"
                        value={storageAdress}
                        type="text"
                        onChange={(event)=>setStorageAdress(event.target.value)}
                    />
                    <button
                      className={byttonStyle.button}
                      onClick={()=>{
                        ButtonClick(storageName, storageDescript, storageAdress, imageSrc);
                      }}
                    >
                      Сохранить
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateStorageForm;