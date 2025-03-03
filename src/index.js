import "./pages/index.css";
import {
  getUserInfo,
  getInitialCards,
  updateUserInfo,
  addNewCard,
  deleteCardFromServer,
  updateAvatar,
} from "./scripts/api";
import { createCard, deleteCard, likeCard } from "./scripts/card";
import { openModal, closeModal } from "./scripts/modal";
import { enableValidation, clearValidation } from "./scripts/validate";
import { renderLoading, handleSubmit } from "./utils/utils";

// DOM элементы
const profileEditButton = document.querySelector(".profile__edit-button");
const cardAddButton = document.querySelector(".profile__add-button");
const profilePopup = document.querySelector(".popup_type_edit");
const profileForm = profilePopup.querySelector(".popup__form");
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");
const profileImage = document.querySelector(".profile__image");
const editAvatarButton = document.querySelector(".profile__edit-avatar-button");
const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarForm = avatarPopup.querySelector(".popup__form");
const avatarInput = avatarForm.querySelector(".popup__input_type_avatar");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = addCardPopup.querySelector(".popup__form");
const popupImage = document.querySelector(".popup_type_image");
const popupImageElement = popupImage.querySelector(".popup__image");
const popupImageCaption = popupImage.querySelector(".popup__caption");
const popupDelete = document.querySelector(".popup_type_delete");
const confirmButton = popupDelete.querySelector(".popup__button_confirm");
const saveButton = avatarForm.querySelector(".popup__button");
const cardName = addCardForm.querySelector(".popup__input_type_card-name");
const cardLink = addCardForm.querySelector(".popup__input_type_url");

let cardToDelete = null;
let cardIdToDelete = null;

// Валидация
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
enableValidation(validationConfig);

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

// Открытие модального окна (попапов)
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

// Открытие попапа редактирования аватара
editAvatarButton.addEventListener("click", () => {
  avatarInput.value = ""; // Очищаем поле ввода
  clearValidation(avatarForm, validationConfig); // Очищаем ошибки перед открытием
  openModal(avatarPopup);
});

// Закрытие по клику на крестик или фон
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

// Обновление аватара
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const avatarLink = avatarInput.value;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку

  // Отправляем данные аватара на сервер
  updateAvatar(avatarLink)
    .then(() => {
      profileImage.style.backgroundImage = `url(${avatarLink})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      // Восстанавливаем текст кнопки
      saveButton.textContent = "Сохранить";
      saveButton.disabled = false;
    });
}
avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// Добавление карточки
function handleFormSubmitCard(evt) {
  evt.preventDefault();

  const name = cardName.value;
  const link = cardLink.value;

  // Меняем текст кнопки на "Сохранение..."
  saveButton.textContent = "Сохранение...";
  saveButton.disabled = true; // Отключаем кнопку

  addNewCard(name, link)
    .then((newCardData) => {
      const newCard = createCard(
        newCardData,
        deleteCard,
        likeCard,
        handleImageClick,
        newCardData.owner._id
      );
      placesList.prepend(newCard); // Добавляем карточку в начало списка
      closeModal(addCardPopup);
      addCardForm.reset(); // Очищаем форму после успешного добавления
    })
    .catch((err) => console.log("Ошибка добавления карточки:", err))
    .finally(() => {
      // Восстанавливаем текст кнопки
      saveButton.textContent = "Создать";
      saveButton.disabled = false;
    });
}
addCardForm.addEventListener("submit", handleFormSubmitCard);

// Редактирование информации о пользователе
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateUserInfo(nameInput.value, jobInput.value).then(
      (updatedUser) => {
        profileTitle.textContent = updatedUser.name;
        profileDescription.textContent = updatedUser.about;
        closeModal(profilePopup);
      }
    );
  }
  handleSubmit(makeRequest, evt);
}
profileForm.addEventListener("submit", handleProfileFormSubmit);

// Удаление карточки с подтверждением
function confirmDeleteCard(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  //openModal(popupDelete);
}
confirmButton.addEventListener("click", () => {
  if (!cardIdToDelete) return;
});

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
