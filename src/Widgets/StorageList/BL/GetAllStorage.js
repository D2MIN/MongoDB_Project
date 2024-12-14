export async function GetAllStorage(user){
    try {
        const response  = await fetch(`http://localhost:8080/api/get/storage/${user}`);
        const allStorage = await response.json(); // Преобразуем ответ в JSON
        let storageInfo = [];
        allStorage.forEach(el => {
            storageInfo.push({
                id : el._id,
                img : el.img,
                name : el.name,
                adress : el.street,
                aboutInfo : el.about,
                countCar : el.carNumber,
            });
        });
        return storageInfo;
    } catch (error) {
        return [];
    }
}

// http://localhost:8080/api/get/storage
// http://localhost:8080//api/post/newstorage