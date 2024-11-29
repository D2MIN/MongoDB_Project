export function DeleteItem(itemId:string, storageId: string){
    fetch(`http://localhost:8080/api/put/storage/${storageId}/removeproduct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "_id": itemId
        })
      })
        .then(response => response.json())
        .catch(error => console.error('Error:', error));
      
}
// /api/put/storage/:id/removeproduct