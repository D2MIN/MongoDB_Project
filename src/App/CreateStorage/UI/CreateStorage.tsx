import React from "react";
import Header from "../../../Widgets/Header/UI/Header.tsx";
import style from './createStorage.module.scss';
import CreateStorageForm from "../../../Widgets/CreateStorageForm/UI/CreateStorageForm.tsx";

function CreateStore(){
    return(
        <div className={style.createStoragePage}>
            <Header/>
            <CreateStorageForm/>
        </div>
    );
}

export default CreateStore;