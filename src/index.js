//  *
//    ** Импорты
//    ** Переменные
//    ** Функции
//    ** Обработчики событий
//       *** при открытии попапов
//       *** при закрытии попапов
//       *** при отправке форм
//       *** обработчик, открывающий попап при клике по изображению карточки 
//    ** Экспорты

import './pages/index.css';
import { initialCards } from './scripts/cards';
import { placesList, createCard, deleteCard, likeCard } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { handleFormSubmitCard } from './scripts/cardFunction';

// DOM

// Переменные попапов
const popupImage = document.querySelector('.popup_type_image');
const popupImageElement = popupImage.querySelector('.popup__image');
const popupImageCaption = popupImage.querySelector('.popup__caption');

// Переменные для кнопок открытия попапов
const profileEditButton = document.querySelector('.profile__edit-button');
const cardAddButton = document.querySelector('.profile__add-button');

// Переменные попапа редактирования профиля
const profilePopup = document.querySelector('.popup_type_edit');
const profileForm = profilePopup.querySelector('.popup__form');
const profileCloseButton = profilePopup.querySelector('.popup__close');

// Переменные полей формы профиля
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Переменые попапа добавления карточки
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const cardCloseButton = addCardPopup.querySelector('.popup__close');


// Функция открытия попапа с изображением
function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupImageCaption.textContent = name;
  openModal(popupImage);
}

//Функция создания карточек (вариант с forEach)
function createCards() {
  initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, deleteCard, likeCard, handleImageClick);
    placesList.appendChild(newCard);
  });
}

createCards()


//Открытие модального окна
profileEditButton.addEventListener('click', () => {
  nameInput.value = document.querySelector('.profile__title').textContent;
  jobInput.value = document.querySelector('.profile__description').textContent; 
  openModal(profilePopup)});

cardAddButton.addEventListener('click', () => {
  openModal(addCardPopup)});

//Закрытие по клику на крестик или фон
document.querySelectorAll('.popup').forEach((popup)=> {
  popup.addEventListener('click', (event) => {
    if (
      event.target.classList.contains('popup') || 
      event.target.classList.contains('popup__close')
    ) {
      closeModal(popup);
    }
  });
});

// Редактирование информации о пользователе
// Заполняем поля формы текущими значениями
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent; 

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Получите значение полей jobInput и nameInput из свойства value
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    // Выберите элементы, куда должны быть вставлены значения полей
    const nameInputElement = document.querySelector('.profile__title');
    const jobInputElement = document.querySelector('.profile__description');

    // Вставьте новые значения с помощью textContent
    nameInputElement.textContent = nameValue;
    jobInputElement.textContent = jobValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleFormSubmit); 

//Прикрепляем обработчик к форме новой карточки
addCardForm.addEventListener('submit', handleFormSubmitCard);

export { handleImageClick };