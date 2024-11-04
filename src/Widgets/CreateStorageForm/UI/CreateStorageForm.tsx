import React, { useState } from "react";
import style from './CreateStorageForm.module.scss';

function CreateStorageForm(){

    const [imageSrc, setImageSrc] = useState<string | null>(null);

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
                    <input className={style.input} placeholder="Название склада" type="text" />
                    <textarea className={style.textarea} placeholder="Описание склада"></textarea>
                    <input className={style.input} placeholder="Адрес склада" type="text" />
                </div>
            </div>
        </div>
    );
}

export default CreateStorageForm;