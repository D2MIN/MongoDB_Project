import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { storage } from './StorageScheme.js';
import { users } from './UsersScheme.js';

const app = express();
const port = 8080; // Сервер будет слушать этот порт
const url = 'mongodb://localhost:27017/storage';

// Используем cors middleware для всех маршрутов
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Увеличивает лимит для JSON

// Подключение к серверу БД
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}).then(() => console.log('Подключение к MongoDB через Mongoose успешно'))
  .catch(err => console.error('Ошибка подключения:', err));


// Запросы на (локальный) сервер

// Запрос на отпраку данных
app.post('/api/post/newstorage',async (req,res)=>{
  try{
    const {name, adress, about, img} = await req.body;
    const newStorage = new storage({
      name: name,
      street : adress,
      about : about,
      img : img,
      carNumber : 0,
      product : {},
      cars : {}
    });
    newStorage.save()
      .then(() => console.log('Склад добавлен'))
      .catch(err => console.error('Ошибка создания склада:', err));
    res.status(200).json({ status: "Done" });
  } catch (error){
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

app.post('/api/post/createuser', async (req,res)=>{
  try {
    const {login, password} =  req.body;
    const newUser = new users({
      password: password,
      login: login,
    });
    newUser.save()
      .then(()=>{console.log("Пользователь зарегестрирован")})
      .catch(()=>console.log('Ошибка создания пользователя'))
    res.status(200).json({status: 'creted'});
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на получение всех данных
app.get('/api/get/storage', async (req, res) => {
  try {
    const allStorage = await storage.find();
    res.json(allStorage);
  } catch (error) {
      console.error("Ошибка при получении данных:", error);
      res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на получение информации по складу
app.get('/api/get/storage/:id/info', async (req, res) => {
  try {
    const storageId = req.params.id;
    const storageInfo = await storage.findById(storageId);
    if (!storageInfo || storageInfo.length === 0) {
      return res.status(404).json({ error: "Склад не найден" });
    }
    res.json(storageInfo);
  } catch (error) {
      console.error("Ошибка при получении данных:", error);
      res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на удаление склада
app.delete('/api/delete/storage/:id', async (req, res) => {
  try {
    const storageId = req.params.id;
    const deletedStorage = await storage.findByIdAndDelete(storageId);
    if (!deletedStorage) {
      return res.status(404).json({ error: "Документ не найден" });
    }
    res.json({ message: "Документ успешно удален", data: deletedStorage });
  } catch (error) {
    console.error("Ошибка при удалении поля:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});



// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});