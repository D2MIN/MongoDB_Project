async function GetItems(carID){
    const res = await fetch(`http://localhost:8080/api/get/caritems/${carID}`);
    return res.json();
}

export default GetItems;