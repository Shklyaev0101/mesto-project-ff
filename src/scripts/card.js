//  * Функции для работы с карточками проекта
//     ** Темплейт карточки
//     ** Функция создания карточки
//     ** Функция для удаления карточки
//     ** Функция обрабатывающая события лайка
//     ** Экспорт

import { openImagePopup } from "./modal";

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Контейнер для карточек
const placesList = document.querySelector('.places__list');

//Функция создания карточки
function createCard(cardData, removeCard, toggleLike) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = cardData.name;

  const cardImage = cardElement.querySelector('.card__image');
    if (cardImage) {
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name + '- картинка';
    } 
  
  //обработчик на изображение
  cardImage.addEventListener('click', () => openImagePopup(cardData.name, cardData.link));
  
  //обработчик на Лайк
  likeButton.addEventListener('click', toggleLike);

  //обработчик на удаление
  const removeCardButton = cardElement.querySelector('.card__delete-button');
  removeCardButton.addEventListener('click', removeCard);

  return cardElement;
}

// Функция для удаления карточки
function removeCard(evt) {
  const elementToRemove = evt.target.closest('.places__item');
  elementToRemove.remove();
}

// Функция обрабатывающая события лайка
function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Функция обрабатывающая события лайка для существующих карточек
function addLikeEventListeners() {
  const allLikeButtons = document.querySelectorAll('.card__like-button');
  allLikeButtons.forEach((button) => {
    button.addEventListener('click', toggleLike);
  });
}

export { placesList, cardTemplate, createCard, removeCard, toggleLike, addLikeEventListeners };