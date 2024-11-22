export async function getStorageInfo(id:string){
    const response = await fetch(`http://localhost:8080/api/get/storage/${id}/info`);
    if (!response.ok) {
        console.error("Ошибка при получении данных:", response.statusText);
        return;
    }
    return response;
}