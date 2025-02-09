//  * Функции для работы с карточками проекта
//     ** Темплейт карточки
//     ** Функция создания карточки
//     ** Функция удаления карточки
//     ** Функция обрабатывающая события лайка
//     ** Экспорт

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// Контейнер для карточек
const placesList = document.querySelector('.places__list');

//Функция создания карточки
function createCard(cardData, deleteCard, likeCard, handleImageClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const removeCardButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
    
    if (cardImage) {
      cardImage.src = cardData.link;
      cardImage.alt = cardData.name + '- картинка';
    } 
  
    cardElement.querySelector('.card__title').textContent = cardData.name;

  //Обработчики событий  
  //Обработчик изображений
  cardImage.addEventListener('click', () => handleImageClick(cardData.name, cardData.link));
  
  //Обработчик Лайка
  likeButton.addEventListener('click', () => likeCard(likeButton));

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
function likeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

// Функция обрабатывающая события лайка для существующих карточек
// Удалена, так как обработчик лайка установлен внутри функции createCard
/*
function addLikeEventListeners() {
  const allLikeButtons = document.querySelectorAll('.card__like-button');
  allLikeButtons.forEach((button) => {
    button.addEventListener('click', () => likeCard(button));
  });
}
*/

export { placesList, createCard, deleteCard, likeCard };