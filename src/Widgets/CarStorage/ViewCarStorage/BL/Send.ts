export async function Send(carName,carID, carItem, carDate, onStorageID, toStorageID) {
    const date = carDate.getDate();
    fetch('http://localhost:8080/api/post/sendcars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carDate: date,
            carName: carName,
            carID : carID,
            carItem: carItem,
            onStorageID: onStorageID,
            toStorageID: toStorageID
        })
    });
}