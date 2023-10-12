///index.js
const express = require('express');
const app = express();
const path = require('path');

const routes = require('./routes/routes'); // Импортируем роуты


// Подключаем контроллер для работы с книгами
const booksController = require('./controllers/booksController');

// Разрешаем парсинг JSON
app.use(express.json());

// Устанавливаем EJS в качестве шаблонизатора
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Используем маршруты для /api/books
app.use('/api/books', booksController);
app.use('/books', routes);

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});