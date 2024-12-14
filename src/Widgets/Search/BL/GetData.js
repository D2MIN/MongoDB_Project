import { GetAllStorage } from "../../StorageList/BL/GetAllStorage.js";

export async function GetData(searchName, userName){
    const data = await GetAllStorage(userName);
    const newData = data.filter((el)=>{
        return (el.name).toLowerCase() == searchName.toLowerCase();
    });

    return newData;
}