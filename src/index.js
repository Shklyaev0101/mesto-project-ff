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

// Переменные элементов профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent; 
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
// Обработчик «отправки» формы профиля, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

    // Вставляем новые значения с помощью textContent
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;

    closeModal(profilePopup);
}

// Прикрепляем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener('submit', handleProfileFormSubmit); 

// Прикрепляем обработчик к форме новой карточки
addCardForm.addEventListener('submit', handleFormSubmitCard);

export { handleImageClick };