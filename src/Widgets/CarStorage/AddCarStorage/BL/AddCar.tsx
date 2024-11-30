export async function AddCar(idStorage,name,capacity){
    const res = await fetch(`http://localhost:8080/api/put/storage/${idStorage}/addcar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            carName : name,
            carWeight : capacity
        })
      });
    console.log(res);
}