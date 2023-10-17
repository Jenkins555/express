// counter.js
const express = require('express');
const router = express.Router();

// Объект, где мы будем хранить значения счетчиков
const counters = {};

// Добавляем новый маршрут для увеличения счетчика
router.post('/counter/:bookId/incr', (req, res) => {
    const { bookId } = req.params;

    if (!counters[bookId]) {
        counters[bookId] = 1;
    } else {
        counters[bookId]++;
    }

    res.status(200).json({ bookId, count: counters[bookId] });
});

// Добавляем новый маршрут для получения значения счетчика
router.get('/counter/:bookId', (req, res) => {
    const { bookId } = req.params;

    if (counters[bookId]) {
        res.status(200).json({ bookId, count: counters[bookId] });
    } else {
        res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = router;
