export async function AcceptItem(carId, storageId){
    const res = await fetch('http://localhost:8080/api/accept/deliveryitem', {
        method : 'PUT',
        headers : {'Content-Type': 'application/json'},
        body : JSON.stringify({
            carId : carId,
            storageId : storageId
        })
    });
    return res;
}