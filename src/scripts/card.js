//  * Функции для работы с карточками проекта
//     ** Темплейт карточки
//     ** Функция создания карточки
//     ** Функция удаления карточки
//     ** Функция обрабатывающая события лайка
//     ** Экспорт

import { updateLikes } from './api';
import { confirmDeleteCard } from './cardFunction';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Контейнер для карточек
const placesList = document.querySelector('.places__list');

//Функция создания карточки
function createCard(cardData, deleteCard, likeCard, handleImageClick, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const removeCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeCount = cardElement.querySelector('.card__like-count'); // Элемент для отображения количества лайков
    
    // Заполняем карточку
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name + ' - картинка';
  cardElement.querySelector('.card__title').textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Проверяем, лайкал ли пользователь и добавляем класс
  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Показываем кнопку удаления только на своих карточках
  if (cardData.owner._id !== userId) {
    removeCardButton.remove();
  } else {
    removeCardButton.addEventListener('click', () => confirmDeleteCard(cardElement, cardData._id));
  }

  //Обработчики событий  
  //Обработчик изображений
  cardImage.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));
  
  //Обработчик Лайка
  likeButton.addEventListener('click', () => likeCard(likeButton, likeCount, cardData, userId));

  //Обработчик удаления
  removeCardButton.addEventListener('click', () => deleteCard(cardElement));

  return cardElement;
}

// Функция удаления карточки
/*
function deleteCard(evt) {
  const elementToRemove = evt.target.closest('.places__item');
  elementToRemove.remove();
}
*/
function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка
function likeCard(likeButton, likeCount, cardData, userId) {
  const isLiked = cardData.likes.some(like => like._id === userId); // Проверяем, лайкал ли пользователь

  updateLikes(cardData._id, !isLiked) // Отправляем запрос на лайк/дизлайк
    .then((updatedCard) => {
      cardData.likes = updatedCard.likes; // Обновляем данные
      likeCount.textContent = updatedCard.likes.length; // Обновляем счетчик лайков
      
      likeButton.classList.toggle("card__like-button_is-active", !isLiked); // Переключаем класс
    })
    .catch(err => console.log('Ошибка обновления лайков:', err));
}

export { placesList, createCard, deleteCard, likeCard };