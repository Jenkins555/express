# В файле README.md написать следующие запросы для MongoDB:

 ### запрос(ы) для вставки данных минимум о двух книгах в коллекцию books,   
 ```
  db.books.insertMany([
    {
      title: "Гордость и предубеждение",
      description: "Культовый роман Джейн Остен был неоднократно экранизирован ",
      authors: "Джейн Остен"
    },
    {
      title: "Великий Гэтсби",
      description: "Мировая классика, проза высочайшего уровня, созданная мастером с безупречным вкусом",
      authors: "Фрэнсис Скотт Фицджеральд"
    }
  ])
 ```
 ### запрос для поиска полей документов коллекции books по полю title,   
 ```
  db.books.find({ title: "The Great Gatsby" })
 ```
 ### запрос для редактирования полей: description и authors коллекции books по _id записи.   
 ```
    db.books.updateOne(
    { _id: ObjectId("book-id") },
    {
      $set: {
        description: "Updated description",
        authors: "Updated authors"
      }
    }
  )
 ```
