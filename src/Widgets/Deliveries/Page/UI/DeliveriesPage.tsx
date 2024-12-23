import React from "react";
import style from './DeliveriesStyle.module.scss';
import { DiliveriItem } from "../../DeliveriItem/UI/DiliveriItem.tsx";

function DeliverisPage(){
    return(
        <div className={style.DeliveriPage}>
            <div className={style.deliveriSection}>
                <h1 className={style.deliveriSection__titile}>Доставки из других складов</h1>
                <DiliveriItem storageName='Склад 1' storageAddress='Постовая 23' carNumber='0ABT231' comingData='22'/>
                <DiliveriItem storageName='Склад 2' storageAddress='Ставрапольская 130' carNumber='0BBH131' comingData='22'/>
                <DiliveriItem storageName='Склад 3' storageAddress='Крассная 41' carNumber='5AAT229' comingData='22'/>
            </div>
        </div>
    )
}

export default DeliverisPage;