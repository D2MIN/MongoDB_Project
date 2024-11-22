import { GetAllStorage } from "../../StorageList/BL/GetAllStorage.js";

export async function GetData(searchName){
    const data = await GetAllStorage();
    const newData = data.filter((el)=>{
        return (el.name).toLowerCase() == searchName.toLowerCase();
    });

    return newData;
}