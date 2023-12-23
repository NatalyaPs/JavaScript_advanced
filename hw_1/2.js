"use strict";

/*
###Задание 2
Вы управляете рестораном, в котором работают разные повара, специализирующиеся 
на определенных блюдах. Клиенты приходят и делают заказы на разные блюда.
Необходимо реализовать функцию newOrder. Создавать вспомогательные функции, 
коллекции, не запрещается. Старайтесь использовать коллекции Map/Set, где это 
актуально. Представленный ниже код должен работать.

Повара и их специализации:
Олег - специализация: Пицца.
Андрей - специализация: Суши.
Анна - специализация: Десерты.

Блюда, которые могут заказать посетители:
Пицца "Маргарита"
Пицца "Пепперони"
Пицца "Три сыра"
Суши "Филадельфия"
Суши "Калифорния"
Суши "Чизмаки"
Суши "Сеякемаки"
Десерт Тирамису
Десерт Чизкейк
*/

// Посетитель ресторана.
class Client {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }
}

// повар
class Chef {
  constructor(name, specialization) {
      this.name = name;
      this.specialization = specialization;
  }
}

const oleg = new Chef("Олег", "Пицца");
const andrey = new Chef("Андрей", "Суши");
const anna = new Chef("Анна", "Десерты");

// // специализации поваров
// const chefsDishes = new Map();
// chefsDishes.set('Пицца', 'Олег');
// chefsDishes.set('Суши', 'Андрей');
// chefsDishes.set('Десерты', 'Анна');

// блюда
const dishes = new Map();
dishes.set("Маргарита", "Пицца");
dishes.set("Пепперони", "Пицца");
dishes.set("Три сыра", "Пицца");
dishes.set("Филадельфия", "Суши");
dishes.set("Калифорния", "Суши");
dishes.set("Чизмаки", "Суши");
dishes.set("Сеякемаки", "Суши");
dishes.set("Тирамису", "Десерт");
dishes.set("Чизкейк", "Десерт");

const chefs = new Map();
chefs.set("Пицца", oleg);
chefs.set("Суши", andrey);
chefs.set("Десерт", anna);

const clientOrder = new Map();


// Вам необходимо реализовать класс, который управляет заказами и поварами.
class Manager {
  constructor(Client, clientOrder) {
    this.Client = Client;
    this.clientOrder = clientOrder;
  }

  newOrder(client, ...orderItems) {
    console.log(`Клиент ${client.firstname} заказал:`);
    
    orderItems.forEach((item) => {
      const dishName = item.name;
      const dishType = item.type;
      const dishQuantity = item.quantity;

      if (!dishes.has(dishName) || dishes.get(dishName) !== dishType) {
        throw new Error(`${dishType} "${dishName}" - такого блюда не существует.`);
      }
      
      const chef = chefs.get(dishType);

      clientOrder.set(client, orderItems);
      console.log(`${dishType} "${dishName}" - ${dishQuantity}; готовит повар ${chef.name}`);
    });
  }
}
console.log(clientOrder);

// Можно передать внутрь конструктора что-либо, если необходимо.
const manager = new Manager();

// Вызовы ниже должны работать верно, менять их нельзя, удалять тоже.
manager.newOrder(
  new Client("Иван", "Иванов"), 
  { name: "Маргарита", quantity: 1, type: "Пицца" },
  { name: "Пепперони", quantity: 2, type: "Пицца" },
  { name: "Чизкейк", quantity: 1, type: "Десерт" },
);
// Вывод:
// Клиент Иван заказал: 
// Пицца "Маргарита" - 1; готовит повар Олег
// Пицца "Пепперони" - 2; готовит повар Олег
// Десерт "Чизкейк" - 1; готовит повар Анна

// ---

const clientPavel = new Client("Павел", "Павлов");
manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 5, type: "Суши" },
  { name: "Калифорния", quantity: 3, type: "Суши" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 3; готовит повар Андрей

manager.newOrder(
  clientPavel, 
  { name: "Калифорния", quantity: 1, type: "Суши" },
  { name: "Тирамису", quantity: 2, type: "Десерт" },
);
// Вывод:
// Клиент Павел заказал: 
// Суши "Филадельфия" - 5; готовит повар Андрей
// Суши "Калифорния" - 4; готовит повар Андрей
// Десерт "Тирамису" - 2; готовит повар Анна

manager.newOrder(
  clientPavel, 
  { name: "Филадельфия", quantity: 1, type: "Суши" },
  { name: "Трубочка с вареной сгущенкой", quantity: 1, type: "Десерт" },
);
// Ничего не должно быть добавлено, должна быть выброшена ошибка:
// Десерт "Трубочка с вареной сгущенкой" - такого блюда не существует. 









