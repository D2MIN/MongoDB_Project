import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { storage } from './StorageScheme.js';
import { users } from './UsersScheme.js';

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
    const password = req.params.password;
    const login = req.params.login;
    if (!login || !password) {
      return res.status(400).json({ error: "Необходимо указать логин и пароль" });
    }
    console.log(login, password);
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

// Запрос на отправку товаров
app.put('/api/put/storage/:onStorageID/to/:toStorageID/sendproduct', async (req,res) => {
  try {
    const onStorageID = req.params.onStorageID;
    const toStorageID = req.params.toStorageID;
    const sendProducts = req.body.products;
    const carSendID = req.body.carSendID;

    const sendProductByReplace = [];

    // Изминения бд записи склада с которого отправляют
    const onStorageInfo = await storage.findById(onStorageID);
    const onProduct = onStorageInfo.product;
    let newProduct = onProduct;
    onProduct.forEach((onProduct)=>{
      for(let product in sendProducts){
        if(onProduct._id == product){
          let itemCount = onProduct.itemCount - sendProducts[product];
          sendProductByReplace.push(onProduct);
          if(itemCount > 0){
            newProduct[newProduct.indexOf(onProduct)].itemCount = newProduct[newProduct.indexOf(onProduct)].itemCount - sendProducts[product];
          }else{
            newProduct.splice(newProduct.indexOf(onProduct),1);
          }
        }
      }
    });


    const updatedStorage = await storage.findByIdAndUpdate(
      onStorageID,
      { $set: { product: newProduct } }, // Устанавливаем поле product в пустой массив
      { new: true } // Возвращает обновленный документ
    );

    // Изминение бд записи склада на который отправляют
    const toStorageInfo = await storage.findById(toStorageID); // Получаю коллекцию склад
    const toProduct = toStorageInfo.product; // Получаю продукты на складе
    
    // Замена числа отправленных
    sendProductByReplace.forEach((productByReplace)=>{
      for(let sendProductID in sendProducts){
        if(sendProductID == productByReplace._id){
          productByReplace.itemCount = sendProducts[sendProductID];
        }
      }
    });
    // Замена числа отправленных если они уже были
    sendProductByReplace.forEach((productByReplace)=>{
      toProduct.forEach((toProduct)=>{
        if(toProduct._id.toString() == productByReplace._id.toString()){
          productByReplace.itemCount += toProduct.itemCount;
        }
      });
    });
    // Добавление тех что были на складе но не отправленные
    let voidSendProduct = [];
    toProduct.forEach((toProduct)=>{
      sendProductByReplace.forEach((productByReplace)=>{
        if(toProduct._id.toString() != productByReplace._id.toString()){
          voidSendProduct.push(toProduct);
          console.log('Add to void');
        }
      });
    });
    voidSendProduct.forEach((product)=>{
      sendProductByReplace.push(product);
    });
    
    const updatedToStorage = await storage.findByIdAndUpdate(
      toStorageID,
      { $set: { product: sendProductByReplace } }, // Устанавливаем поле product в новый массив обьектов
      { new: true } // Возвращает обновленный документ
    );
    if(updatedToStorage){
      console.log('Успешно отправили');
    }

    // const onCars = onStorageInfo.cars;
    // const toCars = toStorageInfo.cars;
    // let newOnCars = [];
    // let newToCar = {};
    // onCars.forEach((car)=>{
    //   if(car._id.toString() != carSendID){
    //     newOnCars.push(car);
    //   }else{
    //     newToCar = car;
    //   }
    // });
    // toCars.push(newToCar);

    // const updatedOnCars = await storage.findByIdAndUpdate(
    //   onStorageID,
    //   { $set: { cars: newOnCars } }, 
    //   { new: true }
    // );
    // const updatedToCars = await storage.findByIdAndUpdate(
    //   toStorageID,
    //   { $set: { cars: toCars } }, 
    //   { new: true }
    // );

  } catch (error) {
    console.error("Ошибка при отправки товаров:", error);
    res.status(500).json({ error: "Ошибка сервера" });
  }
})

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});