const multer = require('multer');

// Настройки загрузки файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    path.join(__dirname, '../uploads', book.fileBook); // Директория, куда будут сохраняться файлы 
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Имя файла будет таким же, как исходное имя
  },
});

// Фильтр для файлов, разрешаем только определенные типы
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf' || file.mimetype === 'application/epub+zip') {
    cb(null, true); // Принимаем файл
  } else {
    cb(null, false); // Отклоняем файл
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
