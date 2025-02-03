/*
Интерсепторы позволяют перехватывать и изменять запросы перед их выполнением,
а также обрабатывать ответы после получения от сервера. Это полезно для таких задач,
как добавление токенов аутентификации, логирование запросов и ответов, обработка ошибок и т.д.

Основные виды интерсептров:
  1. Интерсептор запросов: перехватывает каждый запрос перед его отправкой.
  2. Интерсептор ответов: перехватывает каждый ответ после его получения.

  Интерсепторы являются мощным инструментом для управления HTTP-запросами и ответами в Axios.
  Они помогают централизованно управлять такими аспектами, как аутентификация, логирование и обработка ошибок.
*/

// --------- Установка интерсептора запросов --------- //

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Добавляем интерсептор запросов
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // Добавим токен авторизации в заголовок каждого запроса
    config.headers!.Authorization = `Bearer ${localStorage.getItem('token') as string}`;
    return config; // Обязательно возвращаем измененный конфиг
  },
  error => Promise.reject(error) // Возвращаем ошибку дальше по цепочке промисов
);

// Пример запроса
const getProtectedData = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get('https://api.example.com/protected-data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getProtectedData();

// --------- Установка интерсептора ответов ---------- //

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// Добавляем интерсептор ответов
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    // Логируем успешные ответы
    console.log(`Ответ получен: ${response.status} ${response.statusText}`);
    return response; // Обязательно возвращаем ответ
  },
  (error: AxiosError) => {
    // Логируем ошибки
    console.error(`Ошибка ответа: ${error.response?.status} ${error.response?.statusText}`);

    // Если ошибка связана с истечением срока действия токена, можем попробовать обновить токен
    if (error.response?.status === 401 && error.config.url.includes('refresh-token')) {
      // Обновить токен и повторить запрос
      return refreshTokenAndRetry(error.config);
    }

    return Promise.reject(error); // Возвращаем ошибку дальше по цепочке промисов
  }
);

// Функция для обновления токена и повторения запроса
const refreshTokenAndRetry = async (config: AxiosRequestConfig): Promise<AxiosResponse | void> => {
  try {
    const refreshResponse: AxiosResponse = await axios.post('https://api.example.com/token/refresh');
    localStorage.setItem('token', refreshResponse.data.token);
    config.headers!.Authorization = `Bearer ${refreshResponse.data.token}`;
    return axios(config); // Повторяем оригинальный запрос с обновленным токеном
  } catch (error) {
    console.error('Не удалось обновить токен:', error);
    return Promise.reject(error);
  }
};

// Пример запроса
const getProtectedData = async (): Promise<void> => {
  try {
    const response: AxiosResponse = await axios.get('https://api.example.com/protected-data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getProtectedData();

// -------------- Удаление интерсептров -------------- //

// Если нужно удалить установленный ранее интерсептор,
// можно воспользоваться идентификатором, который возвращается при установке.

import axios, { AxiosInterceptorManager } from 'axios';

// Устанавливаем интерсептор запросов
const requestInterceptorId: number = axios.interceptors.request.use(config => {
  // ...
  return config;
}) as unknown as number;

// Устанавливаем интерсептор ответов
const responseInterceptorId: number = axios.interceptors.response.use(
  response => {
    // ...
    return response;
  },
  error => {
    // ...
    return Promise.reject(error);
  }
) as unknown as number;

// Удаляем интерсепторы
(axios.interceptors.request as AxiosInterceptorManager).eject(requestInterceptorId);
(axios.interceptors.response as AxiosInterceptorManager).eject(responseInterceptorId);
