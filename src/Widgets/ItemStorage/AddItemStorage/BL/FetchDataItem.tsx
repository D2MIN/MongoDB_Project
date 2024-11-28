export async function FetchDataItem(name:string, about:string,img:string,itemW:number,itemCount:number, idStorage){
    const res = await fetch(`http://localhost:8080/api/put/storage/${idStorage}/addproduct`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          about : about,
          imgPath : img,
          itemW : itemW,
          itemCount : itemCount
        })
      });
    console.log(res);
}