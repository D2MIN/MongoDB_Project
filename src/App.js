import { useRef, useState } from "react";

function App() {
  const [name,setName] = useState('');
  const [lastName,setLastName] = useState('');
  const [age,setAge] = useState(0);
  const userData = useRef([]);
  const [userList, setUserList] = useState([]);
  


  // /api/post/users
  function saveData(){
    fetch('http://localhost:8080/api/post/users',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: name, lastName: lastName, age: age }),  // Отправляем данные
    }).then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Ошибка:', error));
  }

  async function getData(){
    const res = await fetch('http://localhost:8080/api/get/users');
    const data = await res.json();
    userData.current = data;
    console.log('Res: ', data);

    generateUserList();
  }

  function generateUserList(){
    let userList = [];
    userData.current.forEach(el => {
      userList.push(
        <div key={el._id} className="user">Имя: {el.name} Фамилия: {el.lastName} age: {el.age}</div>
      );
    });
    console.log(userData);
    setUserList(userList);
  }
  
  return (
    <div className="App">
      <div className="content">
        <div className="form">
            <div>
              <input onChange={(event)=>{setName(event.target.value)}} type="text" name="name"/>
              <input onChange={(event)=>{setLastName(event.target.value)}} type="text" name="lastName"/>
              <input onChange={(event)=>{setAge(event.target.value)}} type="number" name="age"/>
            </div>
            <button onClick={()=>saveData()}>Отправить в форму Users</button>
        </div>
        <div className="GettedForm">
            <button onClick={()=>getData()}>Получить форму Users</button>
            <div className="usersList">
              {userList}
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
