
import { placesList, createCard, deleteCard, likeCard } from './card';
import { closeModal, openModal } from './modal';
import { addNewCard, deleteCardFromServer } from './api';
import { enableValidation } from './validate';


// Получаем элементы формы и попапа
const newCardPopup = document.querySelector(".popup_type_new-card"); // Сам попап
const newCardForm = newCardPopup.querySelector(".popup__form"); // Форма внутри попапа
const newCardNameInput = newCardForm.querySelector(".popup__input_type_card-name"); // Поле для названия
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // Поле для ссылки
const addCardPopup = document.querySelector('.popup_type_new-card');
const addCardForm = addCardPopup.querySelector('.popup__form');
const popupDelete = document.querySelector('.popup_type_delete');
const confirmButton = popupDelete.querySelector('.popup__button_confirm');
let cardToDelete = null;
let cardIdToDelete = null;
const avatarPopup = document.querySelector('.popup_type_edit-avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarInput = avatarForm.querySelector('.popup__input_type_avatar');

// Включаем валидацию на форму обновления аватара
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

// Обработчик отправки формы (например, для отправки на сервер)
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  
  const avatarLink = avatarInput.value;
  
  // Меняем текст кнопки на "Сохранение..."
  const saveButton = avatarForm.querySelector('.popup__button');
  saveButton.textContent = 'Сохранение...';
  saveButton.disabled = true; // Отключаем кнопку

  // Отправляем данные аватара на сервер
  // Пример отправки (вы можете адаптировать под ваш API)
  updateAvatar(avatarLink)
    .then(() => {
      // Обновляем аватар на странице (если нужно)
      document.querySelector('.profile__image').style.backgroundImage = `url(${avatarLink})`;
      closeModal(avatarPopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      // Восстанавливаем текст кнопки
      saveButton.textContent = 'Сохранить';
      saveButton.disabled = false;
    });
}

avatarForm.addEventListener('submit', handleAvatarFormSubmit);

// Обновленный обработчик отправки формы карточки (POST-запрос)
function handleFormSubmitCard(evt) {
  evt.preventDefault(); 

  const cardName = addCardForm.querySelector('.popup__input_type_card-name').value;
  const cardLink = addCardForm.querySelector('.popup__input_type_url').value;

    // Меняем текст кнопки на "Сохранение..."
    const saveButton = addCardForm.querySelector('.popup__button');
    saveButton.textContent = 'Сохранение...';
    saveButton.disabled = true; // Отключаем кнопку

  addNewCard(cardName, cardLink)
    .then((newCardData) => {
      const newCard = createCard(newCardData, deleteCard, likeCard, handleImageClick, newCardData.owner._id);
      placesList.prepend(newCard); // Добавляем карточку в начало списка
      closeModal(addCardPopup);
      addCardForm.reset(); // Очищаем форму после успешного добавления
    })
    .catch(err => console.log('Ошибка добавления карточки:', err))
    .finally(() => {
      // Восстанавливаем текст кнопки
      saveButton.textContent = 'Создать';
      saveButton.disabled = false;
    });
}

// Функция удаления карточки с подтверждением
function confirmDeleteCard(cardElement, cardId) {
  cardToDelete = cardElement;
  cardIdToDelete = cardId;
  openModal(popupDelete);
}

confirmButton.addEventListener('click', () => {
  if (!cardIdToDelete) return;

  deleteCardFromServer(cardIdToDelete)
    .then(() => {
      cardToDelete.remove();
      closeModal(popupDelete);
    })
    .catch(err => console.log('Ошибка удаления карточки:', err));
});

export { handleFormSubmitCard, confirmDeleteCard };