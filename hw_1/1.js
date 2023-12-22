"use strict";

/*
###Задание 1
Создайте обычный объект "Музыкальная коллекция", который можно итерировать. 
Каждая итерация должна возвращать следующий альбом из коллекции. Коллекция 
альбомов - это массив внутри нашего объекта (создать несколько альбомов самому).
Каждый альбом имеет следующую структуру:
{
  title: "Название альбома",
  artist: "Исполнитель",
  year: "Год выпуска"
}
Используйте цикл for...of для перебора альбомов в музыкальной коллекции и 
вывода их в консоль в формате:
"Название альбома - Исполнитель (Год выпуска)"
*/
const albums= [
  { title: "Альбом 1", artist: "Исполнитель 1", year: "2000" },
  { title: "Альбом 2", artist: "Исполнитель 2", year: "2010" },
  { title: "Альбом 3", artist: "Исполнитель 3", year: "2015"
  }
]

// 1й сп-б
const musicCollection = {
  albums,
  [Symbol.iterator]() {
    let index = 0
    return {
      next: () => {
        if (index < this.albums.length) {
          return {done: false, value: this.albums[index++]}
        }
        return {done: true}
      }
    }
  }
}

// перебираем объект
for (const album of musicCollection) {
  console.log(album);
}

// 2й сп-б - ф-я генератор
const musicCollection2 = {
  albums,
  *[Symbol.iterator]() {
    for(const album of albums) {
      yield album
    }
  }
}

for (const album of musicCollection2) {
  console.log(album);
}

// // без Symbol.iterator - перебираем массив
// for (const album of musicCollection.albums) {
//   console.log(`${album.title} - ${album.artist} (${album.year})`);
//   }
