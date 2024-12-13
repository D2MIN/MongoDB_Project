export function DeleteCar(storageId, carId){
    fetch(`http://localhost:8080/api/put/storage/${storageId}/remotecar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_id": carId
        })
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
}