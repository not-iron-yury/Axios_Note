/*
Axios – это популярная JavaScript-библиотека для выполнения HTTP-запросов. Она поддерживает как браузерную среду, так и Node.js.

Основные возможности:
  Поддержка Promise API.
  Простая настройка заголовков и параметров запроса.
  Автоматическая трансформация данных JSON.
  Возможность отмены запросов.
  Поддержка межсегментных запросов (CORS).

Установка:

# Для npm
npm install axi

# Для Yarn
yarn add axios

*/

// ------------------ GET-запрос ------------------ //

const getData = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getData();

// ------------------ POST-запрос ----------------- //

const postData = async () => {
  try {
    const data = { title: 'Example Post', body: 'This is an example of a post.' };
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', data);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

postData();

// ------------------ PUT-запрос ------------------ //

const updateData = async () => {
  try {
    const id = 1;
    const updatedData = { title: 'Updated Title', body: 'This is the updated content.' };
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedData);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

updateData();

// ---------------- DELETE-запрос ----------------- //

const deleteData = async () => {
  try {
    const id = 1;
    const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log(response.status); // Обычно возвращает статус 200 или 204 при успешном удалении
  } catch (error) {
    console.error(error);
  }
};

deleteData();

// --------------- Обработка ошибок --------------- //

// В случае возникновения ошибки Axios возвращает объект error,
// который содержит информацию о статусе запроса, заголовках и других деталях.

import axios from 'axios';

const handleErrorRequest = async () => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/postAss/'); // Ошибка 404
  } catch (error) {
    if (error.response) {
      // Запрос был отправлен и сервер вернул ответ с ошибкой
      console.log('Ошибка ответа:', error.response.data);
      console.log('Статус-код:', error.response.status);
      console.log('Заголовки:', error.response.headers);
    } else if (error.request) {
      // Запрос был сделан, но не получил ответа
      console.log('Запрос не был доставлен:', error.request);
    } else {
      // Что-то случилось до того, как запрос был отправлен
      console.log('Ошибка конфигурации:', error.message);
    }
    console.log('Конфигурация запроса:', error.config);
  }
};

handleErrorRequest();

// ------------- Глобальные параметры ------------- //

// Можно настроить параметры для всех запросов, например, базовый URL или заголовки.

import axios from 'axios';

// Глобальная настройка базовой URL
axios.defaults.baseURL = 'https://api.example.com';

// Глобальные настройки заголовков
axios.defaults.headers.common['Authorization'] = 'Bearer your_token_here';

// Теперь все запросы будут отправляться с указанными параметрами
const getDataWithGlobalConfig = async () => {
  try {
    const response = await axios.get('/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getDataWithGlobalConfig();

// --------------- Экземпляра Axios --------------- //

// Иногда удобно создавать отдельные экземпляры Axios для разных частей приложения.

import axios from 'axios';

// Создаем экземпляр Axios с собственными настройками
const instance = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'X-Custom-Header': 'foobar' },
});

// Использование созданного экземпляра
const getDataFromInstance = async () => {
  try {
    const response = await instance.get('/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getDataFromInstance();
