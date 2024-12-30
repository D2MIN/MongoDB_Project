export async function GetSendCar(toStorage : string){
    let res : any;
    try {
        const response = await fetch(`http://localhost:8080/api/get/sendcars/${toStorage}`,{
            method: 'GET',
            headers:{
                "Content-Type":'application/json'
            },
        });
        res = response.json();
    } catch (error) {
        console.error('Ошибка запроса на получение доставки');
    }
    return(res);
}