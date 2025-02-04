/*
Axios – это популярная JavaScript-библиотека для выполнения HTTP-запросов. Она поддерживает как браузерную среду, так и Node.js.

Основные возможности:
  Поддержка Promise API.
  Простая настройка заголовков и параметров запроса.
  Автоматическая трансформация данных JSON.
  Возможность отмены запросов.
  Поддержка межсегментных запросов (CORS).

Установка:
npm install axios
npm install --save-dev @types/axios

*/

/*
// ---------- Псевдонимы методов запроса ---------- //

axios.request(config)
axios.get(url[, config])
axios.delete(url[, config])
axios.head(url[, config])
axios.options(url[, config])
axios.post(url[, data[, config]])
axios.put(url[, data[, config]])
axios.patch(url[, data[, config]])


// ----------- Полезные функции axios ------------ //

create()              Создает новый экземпляр Axios с конфигурацией по умолчанию. Это полезно, если вы хотите создать несколько экземпляров Axios с разными настройками.
isAxiosError()        Проверяет, является ли объект ошибкой, возвращаемой Axios.
all()                 Позволяет выполнять несколько запросов одновременно и ждать их завершения. Возвращает массив ответов.
spread()              Используется вместе с all() для разбора массива ответов на отдельные
getUri()              Генерирует URL-адрес на основе переданных параметров конфигурации.
CancelToken.source()  Создает источник токена отмены, который можно использовать для отмены одного или нескольких запросов.


// ---------- Свойства экземпляра axios ---------- //

baseURL             Базовый URL, который добавляется к каждому запросу.
headers             Заголовки, которые добавляются ко всем запросам.
defaults            Объект с настройками по умолчанию для всех запросов.
interceptors        Объект, содержащий обработчики перехватчиков запросов и ответов.
timeout             Время ожидания ответа от сервера.
method              Метод HTTP-запроса (например, GET, POST, PUT, DELETE).
url                 URL запроса.
data                Данные, отправляемые в теле запроса.
params              Параметры запроса, добавляемые к URL.
responseType        Тип данных, ожидаемый в ответе (например, json, text, blob).
withCredentials     Флаг, указывающий, нужно ли отправлять куки вместе с запросом.
auth                Объект аутентификации, содержащий имя пользователя и пароль.
maxContentLength    Максимальное количество байтов, которое можно получить в ответе.
maxBodyLength       Максимальное количество байтов, которое можно отправить в теле запроса.
transformRequest    Функции для преобразования данных перед отправкой запроса.
transformResponse   Функции для преобразования данных после получения ответа.
validateStatus      Функция для определения статуса успешного ответа.
xsrfCookieName      Имя cookie, используемое для защиты от CSRF-атак.
xsrfHeaderName      Имя заголовка, используемое для защиты от CSRF-атак.
httpAgent           Агент HTTP, используемый для выполнения запросов.
httpsAgent          Агент HTTPS, используемый для выполнения безопасных запросов.
proxy               Настройки прокси-сервера.

ВАЖНО! Это список частоиспользуемых. Полный список насчитывает больше 110 свойств.


// ----------- Методы экземпляра axios ------------ //

axios.create([config])
axios#request(config)
axios#get(url[, config])
axios#delete(url[, config])
axios#head(url[, config])
axios#options(url[, config])
axios#post(url[, data[, config]])
axios#put(url[, data[, config]])
axios#patch(url[, data[, config]])
axios#getUri([config])
*/

// ------------------ GET-запрос ------------------ //

import axios, { AxiosResponse } from 'axios';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const getData = async (): Promise<void> => {
  try {
    const response: AxiosResponse<Post[]> = await axios.get('https://jsonplaceholder.typicode.com/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getData();

// ------------------ POST-запрос ----------------- //

import axios, { AxiosResponse } from 'axios';

interface NewPost {
  title: string;
  body: string;
  userId: number;
}

const postData = async (): Promise<void> => {
  try {
    const newPost: NewPost = {
      title: 'Example Post',
      body: 'This is an example of a post.',
      userId: 1,
    };
    const response: AxiosResponse<NewPost> = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

postData();

// ------------------ PUT-запрос ------------------ //

import axios, { AxiosResponse } from 'axios';

interface UpdatedPost {
  id: number;
  title: string;
  body: string;
}

const updateData = async (): Promise<void> => {
  try {
    const id = 1;
    const updatedPost: UpdatedPost = {
      id,
      title: 'Updated Title',
      body: 'This is the updated content.',
    };
    const response: AxiosResponse<UpdatedPost> = await axios.put(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
      updatedPost
    );
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

updateData();

// ---------------- DELETE-запрос ----------------- //

import axios, { AxiosResponse } from 'axios';

const deleteData = async (): Promise<void> => {
  try {
    const id = 1;
    const response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    console.log(response.status); // Обычно возвращает статус 200 или 204 при успешном удалении
  } catch (error) {
    console.error(error);
  }
};

deleteData();

// --------------- Обработка ошибок --------------- //

// В случае возникновения ошибки Axios возвращает объект error,
// который содержит информацию о статусе запроса, заголовках и других деталях.

import axios, { AxiosError, AxiosResponse } from 'axios';

const handleErrorRequest = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get('https://example.com/wrong-url'); // Ошибка 404
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Запрос был отправлен и сервер вернул ответ с ошибкой
        console.log('Ошибка ответа:', axiosError.response?.data);
        console.log('Статус-код:', axiosError.response?.status);
        console.log('Заголовки:', axiosError.response?.headers);
      } else if (axiosError.request) {
        // Запрос был сделан, но не получил ответа
        console.log('Запрос не был доставлен:', axiosError.request);
      } else {
        // Что-то случилось до того, как запрос был отправлен
        console.log('Ошибка конфигурации:', axiosError.message);
      }
      console.log('Конфигурация запроса:', axiosError.config);
    }
  }
};

handleErrorRequest();

// ------------- Глобальные параметры ------------- //

// Можно настроить параметры для всех запросов, например, базовый URL или заголовки.

import axios, { AxiosRequestConfig } from 'axios';

// Глобальная настройка базовой URL
axios.defaults.baseURL = 'https://api.example.com';

// Глобальные настройки заголовков
axios.defaults.headers.common['Authorization'] = 'Bearer your_token_here';

const getDataWithGlobalConfig = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get('/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getDataWithGlobalConfig();

// --------------- Экземпляра Axios --------------- //

// Иногда удобно создавать отдельные экземпляры Axios для разных частей приложения.

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Создаем экземпляр Axios с собственными настройками
const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com',
  headers: { 'X-Custom-Header': 'foobar' },
});

const getDataFromInstance = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await instance.get('/posts');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getDataFromInstance();
