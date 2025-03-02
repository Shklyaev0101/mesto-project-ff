const cohortId = "wff-cohort-32";
const token = "287a963c-1bee-42c9-a958-8b44005c5278";

const config = {
  baseURL: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: token,
    "Content-Type": "application/json",
  },
};

// Функция для получения информации о пользователе
const getUserInfo = () => {
  return fetch(`${config.baseURL}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

// Функция для получения карточек с сервера
const getInitialCards = () => {
  return fetch(`${config.baseURL}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
    .catch((err) => console.log(err));
};

// Функция для обновления данных профиля
const updateUserInfo = (name, about) => {
  return fetch(`${config.baseURL}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

// Функция для добавления новой карточки
const addNewCard = (name, link) => {
  return fetch(`${config.baseURL}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

// Функция для обновления лайков
const updateLikes = (cardId, isLiked) => {
  return fetch(`${config.baseURL}/cards/likes/${cardId}`, {
    method: isLiked ? "PUT" : "DELETE", // Добавляем лайк (PUT) или удаляем (DELETE)
    headers: config.headers,
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

// Функция удаления карточки
const deleteCardFromServer = (cardId) => {
  return fetch(`${config.baseURL}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) =>
    res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  );
};

// Функция для обновления аватара
const updateAvatar = (avatarUrl) => {
  return fetch(`${config.baseURL}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  });
};

export {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateLikes,
  deleteCardFromServer,
};
