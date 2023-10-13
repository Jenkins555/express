///routes.js
const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadMiddleware'); // Подключаем middleware для загрузки файлов
const Book = require('../models/book');
const path = require('path'); // Модуль для работы с путями к файлам
const booksController = require('../controllers/booksController'); // Импортируем контроллер




router.get('/books', (req, res) => {
    // Используем контроллер для получения списка всех книг
    res.render('book/index', { books: booksController.books });
});

router.get('/books/:id', (req, res) => {
    const { id } = req.params;
    const book = booksController.books.find((b) => b.id === id);
    res.render('book/view', { book });
});

router.get('/books/create', (req, res) => {
    res.render('book/create'); // Отображаем страницу создания книги
});


router.get('/books/:id/edit', (req, res) => {
    const { id } = req.params;
    const book = booksController.books.find((b) => b.id === id);
    if (book) {
        res.render('book/update', { book }); // Отображаем страницу редактирования книги
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});


// Роут для создания данных о книге с загрузкой файла
router.post('/', upload.single('fileBook'), (req, res) => {
    try {
        console.log('Received file:', req.file); // Логгирование для отладки
        // Извлекаем данные из тела запроса и загруженного файла
        const { title, description, authors, favorite, fileCover, fileName } = req.body;
        const fileBook = req.file.path; // Путь к загруженному файлу

        // Генерируем уникальный ID на основе времени
        const id = Date.now().toString();

        // Создаем новый экземпляр класса Book
        const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName, fileBook);

        // Добавляем новую книгу в массив books
        books.push(newBook);

        // Отправляем успешный ответ с созданным объектом книги
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error:', error); // Логгирование ошибки
        // Обрабатываем ошибку, если что-то пошло не так
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Роут для скачивания файла книги по :id
router.get('/:id/download', (req, res) => {
    try {
        const { id } = req.params;
        const book = books.find((b) => b.id === id);

        if (!book) {
            res.status(404).json({ message: 'Book not found' });
        } else {
            // Путь к файлу книги
            const filePath = path.join(__dirname, '../uploads', book.fileBook);

            // Используем res.download() для скачивания файла
            res.download(filePath, book.fileName, (err) => {
                if (err) {
                    // Если произошла ошибка во время скачивания
                    res.status(500).json({ message: 'Internal Server Error' });
                }
            });
        }
    } catch (error) {
        // Обрабатываем ошибку, если что-то пошло не так
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
