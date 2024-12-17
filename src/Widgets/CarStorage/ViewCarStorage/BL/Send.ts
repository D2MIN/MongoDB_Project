export async function Send(onStorageID, toStorageID, items, carSendID){

    const res = await fetch(`http://localhost:8080/api/put/storage/${onStorageID}/to/${toStorageID}/sendproduct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        products : items,
        carSendID : carSendID,
      })
    });
    console.log(res);
}