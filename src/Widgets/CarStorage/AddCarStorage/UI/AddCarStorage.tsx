import React, { useContext, useState } from "react";
import style from './AddCarStorage.module.scss';
import { AddCar } from "../BL/AddCar.tsx";
import StorageContext from "../../../../App/StorageInfo/BL/useStorageContext.tsx";

export function AddCarStorage(){
    const [carName, setCarName] = useState("");
    const [capacity, setCapacity] = useState("");
  
    const {data,setData} = useContext(StorageContext);

    const handleSubmit = (e) => {
      e.preventDefault();
      // Логика для обработки данных
      AddCar(data._id,carName,capacity)
      // Очистка полей после отправки
      setCarName("");
      setCapacity("");
    };
  
    return (
      <div className={style.container}>
        <form onSubmit={handleSubmit} className={style.form}>
          <div className={style.inputGroup}>
            <label htmlFor="carName" className={style.label}>
              Название
            </label>
            <input
              type="text"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
              className={style.input}
              placeholder="Введите номер машины"
            />
          </div>
          <div className={style.inputGroup}>
            <label htmlFor="capacity" className={style.label}>
              Вместимость
            </label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className={style.input}
              placeholder="Введите вместимость"
            />
          </div>
          <button type="submit" className={style.button}>
            Создать
          </button>
        </form>
      </div>
    );
}