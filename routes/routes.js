const express = require('express');
const router = express.Router();
const upload = require('../controllers/uploadMiddleware'); // Подключаем middleware для загрузки файлов
const Book = require('../models/book');
const path = require('path'); // Модуль для работы с путями к файлам

// Роут для создания данных о книге с загрузкой файла
router.post('/books', upload.single('fileBook'), async (req, res) => {
  try {
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
    const fileBook = req.file.path; // Путь к загруженному файлу

    const newBook = new Book({
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook,
    });

    const savedBook = await newBook.save(); // Сохраняем новую книгу в базу данных

    res.status(201).json(savedBook);
  } catch (error) {
    console.error('Error:', error); // Логгирование ошибки
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Роут для скачивания файла книги по :id
router.get('/books/:id/download', async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
    } else {
      const filePath = path.join(__dirname, '../uploads', book.fileBook);

      // Используем res.download() для скачивания файла
      res.download(filePath, book.fileName, (err) => {
        if (err) {
          res.status(500).json({ message: 'Internal Server Error' });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
