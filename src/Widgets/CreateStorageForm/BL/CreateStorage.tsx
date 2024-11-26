export async function Post(name, about, adress, img, userName){
    try {
        const response = await fetch('http://localhost:8080/api/post/newstorage', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Задаем тип контента как JSON
            },
            body: JSON.stringify({ name: name, about: about, adress: adress, img : img, user : userName}), // Преобразуем данные в JSON-строку
          });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return {setDonePushFlag: true, setErrorPushFlag: false};
    } catch (error) {
        return {setDonePushFlag: false, setErrorPushFlag: true};
    }
};