const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

константное приложение = экспресс();
const PORT = процесс.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/user-registration', {
   useNewUrlParser: правда,
   useUnifiedTopology: правда,
});

//Определение модели пользователя
const User = mongoose.model('Пользователь', {
   имя пользователя: Строка,
   электронная почта: строка,
   пароль: Строка,
});

app.use(bodyParser.json());

// Регистрация нового пользователя
app.post('/register', async (req, res) => {
   const {имя пользователя, адрес электронной почты, пароль} = req.body;

   пытаться {
     // Проверка, существует ли пользователь с таким адресом электронной почты
     constexistUser = await User.findOne({электронная почта});
     если (существующийпользователь) {
       return res.status(400).json({ message: 'Пользователь с такой электронной почтой уже зарегистрирован' });
     }

     // Создание нового пользователя
     const newUser = новый пользователь ({имя пользователя, адрес электронной почты, пароль });
     ожидайте newUser.save();

     res.status(201).json({ message: 'Регистрация успеха' });
   } поймать (ошибка) {
     res.status(500).json({ message: 'Ошибка сервера' });
   }
});

app.listen(PORT, () => {
   console.log(`Сервер запущен на порту ${PORT}`);
});
