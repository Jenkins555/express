const express = require('express');
const app = express();



// Подключаем контроллер для работы с книгами
const booksController = require('./controllers/booksController');


// Используем маршруты для /api/counter
app.use('/api/counter', counterController);

// Разрешаем парсинг JSON
app.use(express.json());

// Используем маршруты для /api/books
app.use('/api/books', booksController);

// Запускаем сервер
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
