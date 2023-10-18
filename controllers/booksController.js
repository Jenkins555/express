//booksController.js

const express = require('express');
const router = express.Router();
const Book = require('../models/book');
const axios = require('axios');

// Массив для хранения книг
const books = [];

// Получить все книги
router.get('/', (req, res) => {
  res.json(books);
});

// Получить книгу по ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const book = books.find((b) => b.id === id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

// Создать новую книгу
router.post('/', (req, res) => {
    // Извлекаем данные из тела запроса
    const { title, description, authors, favorite, fileCover, fileName } = req.body;
  
    // Генерируем уникальный ID на основе времени
    const id = Date.now().toString();
  
    // Создаем новый экземпляр класса Book
    const newBook = new Book(id, title, description, authors, favorite, fileCover, fileName);
  
    // Добавляем новую книгу в массив books
    books.push(newBook);
  
    // Отправляем успешный ответ с созданным объектом книги
    res.status(201).json(newBook);
  });

// Редактировать книгу по ID
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover, fileName } = req.body;
  const book = books.find((b) => b.id === id);
  if (!book) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    book.title = title;
    book.description = description;
    book.authors = authors;
    book.favorite = favorite;
    book.fileCover = fileCover;
    book.fileName = fileName;
    res.json(book);
  }
});

// Удалить книгу по ID
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = books.findIndex((b) => b.id === id);
  if (index === -1) {
    res.status(404).json({ message: 'Book not found' });
  } else {
    books.splice(index, 1);
    res.json({ message: 'Book deleted' });
  }
});

module.exports = router;
