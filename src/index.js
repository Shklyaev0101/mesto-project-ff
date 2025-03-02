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

import "./pages/index.css";
//import { initialCards } from './scripts/cards';
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  updateLikes,
} from "./scripts/api";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";
import { handleFormSubmitCard } from "./scripts/cardFunction";
import { enableValidation, clearValidation } from "./scripts/validate";

// DOM

// Переменные попапов
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");

// Переменные для кнопок открытия попапов
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");

// Переменные попапа редактирования профиля
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector(".popup__form");
const profileCloseButton = profilePopup.querySelector(".popup__close");

// Переменные полей формы профиля
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

// Переменные элементов профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list"); // Контейнер для карточек

// Переменные для аватара
const profileImage = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");

// Переменые попапа добавления карточки
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const cardCloseButton = addCardPopup.querySelector(".popup__close");

// Открытие попапа редактирования аватара
editAvatarButton.addEventListener("click", () => {
  avatarInput.value = ""; // Очищаем поле ввода
  clearValidation(avatarForm, validationConfig); // Очищаем ошибки перед открытием
  openModal(avatarPopup);
});

// Закрытие попапа
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

// Функция открытия попапа с изображением
function handleImageClick(name, link) {
  popupImageElement.src = link;
  popupImageElement.alt = name;
  popupImageCaption.textContent = name;
  openModal(popupImage);
}

// Функция для рендеринга карточек
function renderCards(cards, userId) {
  cards.forEach((cardData) => {
    const newCard = createCard(
      cardData,
      deleteCard,
      likeCard,
      handleImageClick,
      userId
    );
    placesList.appendChild(newCard);
  });
}

//Открытие модального окна
profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  clearValidation(profileForm, validationConfig); // Очищаем ошибки перед открытием
  openModal(profilePopup);
});

cardAddButton.addEventListener("click", () => {
  clearValidation(addCardForm, validationConfig); // Очищаем ошибки перед открытием
  openModal(addCardPopup);
});

//Закрытие по клику на крестик или фон
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close")
    ) {
      closeModal(popup);
    }
  });
});

// Редактирование информации о пользователе
// Обработчик «отправки» формы профиля, хотя пока она никуда отправляться не будет
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newAbout = jobInput.value;

  // Меняем текст кнопки на "Сохранение..."
  const saveButton = profileForm.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку, чтобы избежать повторной отправки

  updateUserInfo(newName, newAbout)
    .then((updatedUser) => {
      profileTitle.textContent = updatedUser.name;
      profileDescription.textContent = updatedUser.about;
      closeModal(profilePopup);
    })
    .catch((err) => console.log("Ошибка обновления профиля:", err))
    .finally(() => {
      // Восстанавливаем текст кнопки
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}

// Прикрепляем обработчик к форме профиля:
// он будет следить за событием “submit” - «отправка»
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Прикрепляем обработчик к форме новой карточки
addCardForm.addEventListener("submit", handleFormSubmitCard);

// Инициализация валидации на всех формах
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Запуск валидации
enableValidation(validationConfig);

// Загрузка данных с сервера
getUserInfo()
  .then((userData) => {
    // Обновляем данные на странице
    profileTitle.textContent = userData.name; // Имя пользователя
    profileDescription.textContent = userData.about; // Описание пользователя

    // Обновляем фоновое изображение аватара
    profileImage.style.backgroundImage = `url(${userData.avatar})`; // Аватар пользователя

    // Загрузка карточек
    return getInitialCards() // Получаем карточки с сервера
      .then((cardsData) => {
        // Рендерим карточки
        renderCards(cardsData, userData._id);
      });
  })
  .catch((err) => console.log(err));

// Экспорт
export { handleImageClick };
