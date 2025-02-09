
import { placesList, createCard, deleteCard, likeCard } from './card';
import { closeModal } from "./modal";


// Получаем элементы формы и попапа
const newCardPopup = document.querySelector(".popup_type_new-card"); // Сам попап
const newCardForm = newCardPopup.querySelector(".popup__form"); // Форма внутри попапа
const newCardNameInput = newCardForm.querySelector(".popup__input_type_card-name"); // Поле для названия
const newCardLinkInput = newCardForm.querySelector(".popup__input_type_url"); // Поле для ссылки

// Обработчик отправки формы (создание новой карточки)
function handleFormSubmitCard (evt) {
  evt.preventDefault();

  const cardData = {
    name: newCardNameInput.value, // Получаем название из поля ввода без пробелов
    link: newCardLinkInput.value, // Получаем ссылку на изображение без пробелов
  };

  const newCard = createCard(cardData, deleteCard, likeCard); // Создаём новую карточку
  placesList.prepend(newCard); // Добавляем карточку в начало списка

  closeModal(newCardPopup); // Закрываем попап после добавления
  newCardForm.reset(); // Очищаем форму
}

export { handleFormSubmitCard };