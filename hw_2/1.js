"use strict";

/*
###Задание 1
Необходимо создать класс Library. Конструктор класса, должен принимать начальный 
список книг (массив) в качестве аргумента. Убедитесь, что предоставленный массив 
не содержит дубликатов; в противном случае необходимо выбросить ошибку.
1. Класс должен содержать приватное свойство #books, которое должно хранить 
книги, переданные при создании объекта.
2. Реализуйте геттер-функцию allBooks, которая возвращает текущий список книг.
3. Реализуйте метод addBook(title), который позволяет добавлять книгу в список. 
Если книга с таким названием уже существует в списке, выбросьте ошибку с 
соответствующим сообщением.
4. Реализуйте метод removeBook(title), который позволит удалять книгу из списка 
по названию. Если книги с таким названием нет в списке, выбросьте ошибку с 
соответствующим сообщением.
5. Реализуйте метод hasBook(title), который будет проверять наличие книги в 
библиотеке и возвращать true или false в зависимости от того, есть ли такая 
книга в списке или нет.
*/

class Library {
    #books = [];

    constructor(books) {
        this.#books = books;
    }

    getAllBooks() {
        return this.#books;
    }

    checkingForDuplicates() {
        const titleSet = new Set();
        try {
            this.#books.forEach((book) => {
                if (titleSet.has(book)) {
                    throw new Error(`${book} уже есть в картотеке`);
                }
                titleSet.add(book);
                }
            )
        } catch (error) {
            console.log(error.message);
        }
        
    }

    addBook(title) {
        try {
            if (this.#books.includes(title)) {
                throw new Error(`${title} уже есть в картотеке`);
            }
            this.#books.push(title);
        } catch (error) {
            console.log(error.message);
        }
    }

    removeBook(title) {
        const index = this.#books.indexOf(title);
        try {
            if (index === -1) {
                throw new Error(`"${title}" нет в картотеке`);
            }
            this.#books.splice(index, 1);
        } catch (error) {
            console.log(error.message);
        }
    }

    hasBook(title) {
        return this.#books.includes(title);
    }
}

const listOfBooks = new Library ([
    'книга1', 
    'книга2', 
    'книга3', 
    'книга4', 
    // 'книга1'
]);

console.log(listOfBooks.getAllBooks());

listOfBooks.checkingForDuplicates();
listOfBooks.addBook('книга2');
listOfBooks.addBook('книга5');
console.log(listOfBooks.getAllBooks());

listOfBooks.removeBook('книга5');
console.log(listOfBooks.getAllBooks());

console.log(listOfBooks.hasBook('книга1'));