export function RegisterUser(login: string,password: string){
    fetch('http://localhost:8080/api/post/createuser',{
        method : 'POST',
        headers: {
            'Content-Type': 'application/json', // Задаем тип контента как JSON
          },
        body : JSON.stringify({login : login, password : password}),
    })
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch((error)=>{
        console.error(error);
        return false;
    });
    return true;
}