# Используем официальный образ Node.js
FROM node:14

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем зависимости (package.json и package-lock.json)
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код проекта
COPY . .

# Определяем порт, который будет использоваться
EXPOSE 3000

# Команда для запуска приложения
CMD [ "node", "index.js" ]