export async function Send(carName,carID, carItem, carDate, onStorageID, toStorageID) {
    const date = carDate.getDate();
    const month = carDate.getMonth() + 1;
    const year = carDate.getFullYear();
    fetch('http://localhost:8080/api/post/sendcars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carDate: date,
            carMonth: month,
            carYear: year,
            carName: carName,
            carID : carID,
            carItem: carItem,
            onStorageID: onStorageID,
            toStorageID: toStorageID
        })
    });
}