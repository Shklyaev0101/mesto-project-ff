// Функция проверки ответа (разгружает api.js)
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export { checkResponse };
