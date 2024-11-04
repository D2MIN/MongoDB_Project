export async function GetAllStorage(){
    const response  = await fetch('http://localhost:8080/api/get/storage');
    const allStorage = await response.json(); // Преобразуем ответ в JSON
    let storageInfo = [];
    allStorage.forEach(el => {
        storageInfo.push({
            id : el._id,
            name : el.name,
            adress : el.street,
            aboutInfo : el.about,
            countCar : el.carNumber,
        });
    });
    return storageInfo;
}

// http://localhost:8080/api/get/storage
// http://localhost:8080//api/post/newstorage