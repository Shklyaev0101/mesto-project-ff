// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

//Функция создания карточки
function createCard(cardData, removeCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  const removeCardButton = cardElement.querySelector('.card__delete-button');
  removeCardButton.addEventListener('click', removeCard);

  return cardElement;
}

// Функция для удаления карточки
function removeCard(event) {
  const elementToRemove = event.target.closest('.places__item');
  elementToRemove.remove();
}

// Выводим карточки на страницу
function createCards() {
  for (let i = 0; i < initialCards.length; i++) {
    placesList.append(createCard(initialCards[i], removeCard))
  }
}

createCards()