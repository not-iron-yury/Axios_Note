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

// Добавляем интерсептор запросов
axios.interceptors.request.use(
  config => {
    // Добавим токен авторизации в заголовок каждого запроса
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    return config; // Обязательно возвращаем измененный конфиг
  },
  error => Promise.reject(error) // Возвращаем ошибку дальше по цепочке промисов
);

// Пример запроса
const getProtectedData = async () => {
  try {
    const response = await axios.get('https://api.example.com/protected-data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getProtectedData();

// --------- Установка интерсептора ответов ---------- //

// Добавляем интерсептор ответов
axios.interceptors.response.use(
  response => {
    // Логируем успешные ответы
    console.log(`Ответ получен: ${response.status} ${response.statusText}`);
    return response; // Обязательно возвращаем ответ
  },
  error => {
    // Логируем ошибки
    console.error(`Ошибка ответа: ${error.response.status} ${error.response.statusText}`);

    // Если ошибка связана с истечением срока действия токена, можем попробовать обновить токен
    if (error.response.status === 401 && error.response.config.url.includes('refresh-token')) {
      // Обновить токен и повторить запрос
      return refreshTokenAndRetry(error.config);
    }

    return Promise.reject(error); // Возвращаем ошибку дальше по цепочке промисов
  }
);

// Функция для обновления токена и повторения запроса
const refreshTokenAndRetry = async config => {
  try {
    const refreshResponse = await axios.post('https://api.example.com/token/refresh');
    localStorage.setItem('token', refreshResponse.data.token);
    config.headers.Authorization = `Bearer ${refreshResponse.data.token}`;
    return axios(config); // Повторяем оригинальный запрос с обновленным токеном
  } catch (error) {
    console.error('Не удалось обновить токен:', error);
    return Promise.reject(error);
  }
};

// Пример запроса
const getProtectedData = async () => {
  try {
    const response = await axios.get('https://api.example.com/protected-data');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

getProtectedData();

// -------------- Удаление интерсептров -------------- //

// Если нужно удалить установленный ранее интерсептор,
// можно воспользоваться идентификатором, который возвращается при установке.

// Устанавливаем интерсептор запросов
const requestInterceptorId = axios.interceptors.request.use(config => {
  // ...
  return config;
});

// Устанавливаем интерсептор ответов
const responseInterceptorId = axios.interceptors.response.use(
  response => {
    // ...
    return response;
  },
  error => {
    // ...
    return Promise.reject(error);
  }
);

// Удаляем интерсепторы
axios.interceptors.request.eject(requestInterceptorId);
axios.interceptors.response.eject(responseInterceptorId);
