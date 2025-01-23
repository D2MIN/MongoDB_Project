import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { storage } from './StorageScheme.js';
import { users } from './UsersScheme.js';
import {sendCars} from './SendCarsScheme.js';

const app = express();
const port = 8080; // Сервер будет слушать этот порт
const url = 'mongodb://127.0.0.1:27017/storage';

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
      product : [],
      cars : []
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
    res.status(200).json(allStorage);
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
    
    const deliveryCar = await sendCars.find({toStorage : storageId});
    if(deliveryCar.length != 0){
      return res.status(300).json({ error: "На склад едет доставка" });
    }else{
      const deletedStorage = await storage.findByIdAndDelete(storageId);
    }
    if (!deletedStorage) {
      return res.status(404).json({ error: "Склад не найден" });
    }
    res.json({ message: "Склад успешно удален", data: deletedStorage });
  } catch (error) {
    console.error("Ошибка при удалении склада:", error);
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
    const password = req.params.password;
    const login = req.params.login;
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
    res.json({ message: "Продукт успешно добавлен"});
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

    const updatedStorage = await storage.findByIdAndUpdate(
      storageId,
      { $pull: { product: criteria } }, // Удаляет элементы массива product, соответствующие criteria
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedStorage) {
      return res.status(404).json({ error: "Склад не найден" });
    }

    console.log('Продукт успешно удален');
    res.json({ message: "Продукт успешно удален"});
  } catch (error) {
    console.error("Ошибка при удалении продукта:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на добавление нового объекта в массив cars
app.put('/api/put/storage/:id/addcar', async (req, res) => {
  try {
    const storageId = req.params.id;
    const newCar = req.body;
    
    const updatedStorage = await storage.findByIdAndUpdate(
      storageId,
      { $push: { cars: newCar } },
      { new: true } // Возвращает обновленный документ
    );
    if (!updatedStorage) {
      return res.status(404).json({ error: "Склад не найден" });
    }
    res.json({ message: "Машина успешно добавлен"});
    console.log('Машина успешно добавлена');
  } catch (error) {
    console.error("Ошибка при добавлении машины:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на удаление машины из массива Car
app.put('/api/put/storage/:id/remotecar', async (req, res) => {
  try {
    const storageId = req.params.id;
    const criteria = req.body; // Условие для удаления (например, { id: 2dsfhsf8sf })

    const updatedStorage = await storage.findByIdAndUpdate(
      storageId,
      { $pull: { cars: criteria } }, // Удаляет элементы массива product, соответствующие criteria
      { new: true } // Возвращает обновленный документ
    );

    if (!updatedStorage) {
      return res.status(404).json({ error: "Склад не найден" });
    }

    console.log('Машина успешно удалена');
    res.json({ message: "Машина успешно удалена", data: updatedStorage });
  } catch (error) {
    console.error("Ошибка при удалении машины:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос на удаления товаров которые ушли в дотавку
app.put('/api/put/storage/:id/putitems', async (req,res)=>{
  try {
    const storageId = req.params.id;
    const deliveryItems = req.body.items;

    const storageInfo = await storage.findById(storageId);
    let storageProduct = storageInfo.product;

    for(let i = 0; i != storageProduct.length; i++){
      let productId = storageProduct[i]._id;
      if(deliveryItems[productId] != undefined){
        storageProduct[i].itemCount = storageProduct[i].itemCount - deliveryItems[productId];
      }
    }

    let newStorageProduct = storageProduct.filter((product) => product.itemCount > 0);

    const newStorageInfo = await storage.findByIdAndUpdate(
      storageId,
      {$set : {product : newStorageProduct}},
      {new : true}
    );
    if(newStorageInfo){
      res.status(200).json({massage: 'Товары изменены'});
      console.log('Товары изменены')
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error : 'Ошибка сервера'});
  }

});

// Добавляем отправленую машину в БД
app.post('/api/post/sendcars', async (req,res) => {
  try {
    const {carName, carID, carWeigth , carItem, carDate, carMonth, carYear, onStorageID, toStorageID} = req.body;
    
    // Информация склада отправителя
    const onStorageInfo = await storage.findById(onStorageID);
    // Продукты которые находятся на складе отправителя.
    const onProduct = onStorageInfo.product;
    // Массив с ID отправленных товаров из carItem
    let sendProductID = [];
    for(let productID in carItem){
      sendProductID.push(productID);
    }
    // Сверяем ID и добавляем товары
    let sendProduct = [];
    onProduct.forEach(product => {
      if(sendProductID.indexOf(product.id) != -1){
        let newProduct = product;
        newProduct.itemCount = carItem[product._id];
        sendProduct.push(newProduct);
      }
    });
    
    const newSendCar = new sendCars({
      carName: carName,
      carID : carID,
      carItem: sendProduct, 
      carDate: carDate,
      carMonth: carMonth,
      carYear: carYear,
      onStorage: onStorageID,
      toStorage: toStorageID,
      carWeigth: carWeigth
    });
    newSendCar.save()
      .then(()=>{console.log("Машина отправлена")})
      .catch(()=>console.log('Ошибка отправки машины'))
    res.status(200).json({status: 'send'});
  } catch (error) {
    res.status(500).json({ error: "Ошибка сервера" });
  }
});

// Запрос доставок на склад toStorage
app.get('/api/get/sendcars/:toStorage', async (req,res)=>{
  try {
    const toStorage = await req.params.toStorage;
    const AllSendCars = await sendCars.find({toStorage});
    if(!AllSendCars){
      return res.status(404).json({error: 'Доставки не найдены'});
    }
    res.json(AllSendCars);
  } catch (error) {
    console.error('Ошибка при чтении данных о доставках', error);
    res.status(500).json({error: "Ошибка сервера"});
  }
});

// Запрос на получение товаров в машине доставки
app.get('/api/get/caritems/:carID', async(req,res)=>{
  try {
    const carId = await req.params.carID;
    const car = await sendCars.findById(carId);
    if(!car){
      return res.status(404).json({error: "Машина не найдена"});
    }
    if(car.carItem != undefined){
      res.json(car.carItem);
    }else{
      return res.status(404).json({error: "Товары не найдена"});
    }
  } catch (error) {
    console.error('Ошибка при получении данных о предметах доставки', error);
    res.status(500).json({error: "Ошибка сервера"});
  }
});

// Принимаем товары с доставки
app.put('/api/accept/deliveryitem', async (req,res)=>{
  try {
    const carId = req.body.carId;
    const storageId = req.body.storageId;

    const deliveryCar = await sendCars.findById(carId);
    let deliveryItemList = deliveryCar.carItem;

    const storageInfo = await storage.findById(storageId);
    let storageItemList = storageInfo.product;
    
    for(let i=0; i != deliveryItemList.length; i++){
      let flag = true;
      for(let j=0; j != storageItemList.length; j++){
        let id1 = storageItemList[j]._id;
        let id2 = deliveryItemList[i]._id;
        if(id1.equals(id2)){
          storageItemList[j].itemCount += deliveryItemList[i].itemCount;
          flag = false;
        }
      }
      if(flag == true){
        storageItemList.push(deliveryItemList[i]);
      }
    }

    const updateStorage = await storage.findByIdAndUpdate(
      storageId,
      {$set : {product : storageItemList}},
      {new: true}
    );

    if(updateStorage){
      console.log('Товары приняты');
      let deleteCar = await sendCars.findByIdAndDelete(carId);
      let clearCar = [{
        _id : deleteCar._id,
        carName: deleteCar.carName,
        carWeight: deleteCar.carWeigth
      }];
      
      const oldStorage = await storage.findById(storageId);
      const oldCars = oldStorage.cars;

      let newcars = clearCar.concat(oldCars)

      const updateStorageCar = await storage.findByIdAndUpdate(
        storageId,
        {$set: {cars : newcars}},
        {new: true}
      );
    }
    res.status(200)

  } catch (error) {
    console.error("Ошибка сервера",error);
    res.status(500).json({error:"Ошибка сервера"});
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});