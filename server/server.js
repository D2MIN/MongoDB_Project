import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { Users } from './UserScheme.js';

const app = express();
const port = 8080; // Сервер будет слушать этот порт
const url = 'mongodb://localhost:27017/test';

// Используем cors middleware для всех маршрутов
app.use(cors());
app.use(express.json());

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log('Подключение к MongoDB через Mongoose успешно'))
  .catch(err => console.error('Ошибка подключения:', err));

app.post('/api/post/users',(req,res)=>{
  const {name,lastName,age} = req.body;
  console.log(req.body);
  const newUser = new Users({name: name, lastName: lastName, age: age});
  newUser.save()
    .then(() => console.log('Пользователь сохранен'))
    .catch(err => console.error('Ошибка сохранения:', err));
})

app.get('/api/get/users', async (req, res) => {
    const allUser = await Users.find();
    res.json(allUser);
});

  // Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});