/*
Интерсепторы (interceptors) в Axios позволяют перехватывать запросы перед их отправкой и ответы после получения.
Это полезно для добавления общих заголовков, обработки ошибок, логирования и других задач.

Виды интерсепторов:
1. Запросы: могут изменять конфигурацию запроса до его отправки.
2. Ответы: могут обрабатывать ответ сервера до того, как он будет передан в обработчик then.
*/





// ------------- Интерсептор для запросов ----------- //

// интерсептор для всех запросов
axios.interceptors.request.use(
  config => {
    // Добавление токена авторизации к каждому запросу
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Обязательно возвращаем измененную конфигурацию
  },
  error => {
    // Обработка ошибки при создании запроса
    return Promise.reject(error);
  }
);

// ------------- Интерсептор для ответов ------------ //

// интерсептор для всех ответов
axios.interceptors.response.use(
  response => {
    // Логирование успешного ответа
    console.log(`Response status: ${response.status}`);
    return response; // Обязательно возвращаем ответ
  },
  error => {
    // Обработка ошибок, например, если сервер вернул ошибку 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // Выполняем действия при ошибке аутентификации
      alert('Произошла ошибка аутентификации.');
    }
    return Promise.reject(error);
  }
);


// -------------- Удаление интерсептров ------------- //

// Если нужно удалить установленный ранее интерсептор,
// можно использовать идентификатор, который возвращается при установке:

const requestInterceptorId = axios.interceptors.request.use(...);
const responseInterceptorId = axios.interceptors.response.use(...);

// Удаление интерсепторов
axios.interceptors.request.eject(requestInterceptorId);
axios.interceptors.response.eject(responseInterceptorId);


// --------- Предустановленные интерсептры ---------- //

//Можно создать экземпляр Axios с предустановленными интерсептрами:
const instance = axios.create({ baseURL: 'https://example.com/api' });

// Установка интерсепторов только для этого экземпляра
instance.interceptors.request.use(config => {
  // Добавление кастомного заголовка
  config.headers['X-CUSTOM-HEADER'] = 'value';
  return config;
});

instance.get('/data').then(response => {
  console.log(response.data);
}).catch(error => {
  console.error(error);
});
