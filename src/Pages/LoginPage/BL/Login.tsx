export function Login(login : string, password : string){
    if(login && password){
        const res = fetch(`http://localhost:8080/api/get/user/${login}/${password}`, {
            method : "GET",
            headers: {
                'Content-Type': 'application/json', // Задаем тип контента как JSON
                'referer': 'http://localhost:3000/login'
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть ответила с ошибкой: ' + response.status);
            }
            return response.json();
        })
        .then(data => {return(data)})
        .catch(error => console.error('Ошибка:', error));
        return res;
    }
}