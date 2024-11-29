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

// Запрос на создание склада
app.post('/api/post/newstorage',async (req,res)=>{
  try{
    const {name, adress, about, img, user} = await req.body;
    const newStorage = new storage({
      userLogin : user,
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

// Запрос на получение всех данных
app.get('/api/get/storage/:user', async (req, res) => {
  try {
    const user = req.params.user;
    const allStorage = await storage.find({ userLogin: user });
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

// Запрос на создания пользователя
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

// Запрос на получение пользователя
app.get('/api/get/user/:login/:password', async(req, res)=>{
  try {
    const referer = req.headers.referer;
    if (referer !== 'http://localhost:3000/') {
      return res.status(403).json({ error: "Недопустимый источник запроса" });
    }
    const login = req.params.login;
    const password = req.params.password;
    if (!login || !password) {
      return res.status(400).json({ error: "Необходимо указать логин и пароль" });
    }
    const user = await users.findOne({ login, password });
    if (!user) {
      return res.status(404).json({ error: "Пользователь не найден" });
    }
    res.json(user);
  }
  catch(error){
    console.log(error);
  }
})

// Запрос на добавление нового объекта в массив product
app.put('/api/put/storage/:id/addproduct', async (req, res) => {
  try {
    const storageId = req.params.id;
    const newProduct = req.body;
    
    const updatedStorage = await storage.findByIdAndUpdate(
      storageId,
      { $push: { product: newProduct } },
      { new: true } // Возвращает обновленный документ
    );
    if (!updatedStorage) {
      return res.status(404).json({ error: "Склад не найден" });
    }
    res.json({ message: "Продукт успешно добавлен", data: updatedStorage });
    console.log('Продукт успешно добавлен');
  } catch (error) {
    console.error("Ошибка при добавлении продукта:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на удаление объекта из массива product
app.put('/api/put/storage/:id/removeproduct', async (req, res) => {
  try {
    const storageId = req.params.id;
    const criteria = req.body; // Условие для удаления (например, { id: 2dsfhsf8sf })

    console.log(storageId, criteria);
    const updatedStorage = await storage.findByIdAndUpdate(
      storageId,
      { $pull: { product: criteria } }, // Удаляет элементы массива product, соответствующие criteria
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedStorage) {
      return res.status(404).json({ error: "Склад не найден" });
    }

    console.log('Продукт успешно удален');
    res.json({ message: "Продукт успешно удален", data: updatedStorage });
  } catch (error) {
    console.error("Ошибка при удалении продукта:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});


// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});