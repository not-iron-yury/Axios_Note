// Axios – это популярная JavaScript-библиотека для выполнения HTTP-запросов. Она поддерживает как браузерную среду, так и Node.js.

// Основные возможности:
// Поддержка Promise API.
// Простая настройка заголовков и параметров запроса.
// Автоматическая трансформация данных JSON.
// Возможность отмены запросов.
// Поддержка межсегментных запросов (CORS).
// Установка:

// # Для npm
// npm install axios

// # Для Yarn
// yarn add axios

//import axios from 'axios';

// ---------- Базовый пример использования ---------- //

// GET запрос
axios
  .get('https://example.com/api/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// POST запрос
axios
  .post('https://example.com/api/login', { username: 'user', password: 'password' })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// ------------- Примеры частых ситуаций ------------ //

//1. GET-запрос с параметрами:
const params = { id: 12345 };

axios
  .get('https://example.com/api/items', { params })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// -------------------------------------------------- //

//  2. POST-запрос с данными в формате JSON:
const data = { name: 'John Doe', age: 30 };

axios
  .post('https://example.com/api/users', data)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// -------------------------------------------------- //

//  3. PUT-запрос для обновления ресурса:
const updatedData = { name: 'Jane Doe', age: 31 };

axios
  .put('https://example.com/api/users/12345', updatedData)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// -------------------------------------------------- //

//  4. DELETE-запрос для удаления ресурса:
axios
  .delete('https://example.com/api/users/12345')
  .then(response => {
    console.log(response.status); // Обычно 204 No Content
  })
  .catch(error => {
    console.error(error);
  });

// -------------------------------------------------- //

//  5. Установка заголовков:
const config = {
  headers: {
    Authorization: 'Bearer your_token_here',
  },
};

axios
  .get('https://example.com/api/protected-data', config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// -------------------------------------------------- //

//  6. Отмена запроса:
const CancelToken = axios.CancelToken;
let cancel;

axios
  .get('https://example.com/api/slow-request', {
    cancelToken: new CancelToken(c => {
      cancel = c;
    }),
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    if (axios.isCancel(error)) {
      console.log('Request canceled');
    } else {
      console.error(error);
    }
  });

// Отменяем запрос через некоторое время
setTimeout(() => {
  cancel();
}, 5000);

// -------------------------------------------------- //

//  7. Создание экземпляра Axios с предустановленными настройками:
const instance = axios.create({
  baseURL: 'https://example.com/api',
  timeout: 10000,
  headers: { 'X-Custom-Header': 'foobar' },
});

instance
  .get('/users')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });

// -------------------------------------------------- //
