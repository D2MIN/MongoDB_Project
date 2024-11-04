import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { storage } from './StorageScheme.js';

const app = express();
const port = 8080; // Сервер будет слушать этот порт
const url = 'mongodb://localhost:27017/test';

// Используем cors middleware для всех маршрутов
app.use(cors());
app.use(express.json());

// Подключение к серверу БД
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log('Подключение к MongoDB через Mongoose успешно'))
  .catch(err => console.error('Ошибка подключения:', err));


// Запросы на (локальный) сервер
app.post('/api/post/newstorage',(req,res)=>{
  const {name, adress, aboutInfo} = req.body;
  const newStorage = new storage({
    name: name,
    street : adress,
    about : aboutInfo,
    carNumber : 0,
    product : {},
    cars : {}
  });
  newStorage.save()
    .then(() => console.log('Пользователь сохранен'))
    .catch(err => console.error('Ошибка сохранения:', err));
})

app.get('/api/get/storage', async (req, res) => {
  try {
    const allStorage = await storage.find();
    res.json(allStorage);
  } catch (error) {
      console.error("Ошибка при получении данных:", error);
      res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});