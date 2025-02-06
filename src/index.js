//  *
//    ** Импорты
//    ** Массив с карточками
//    ** Функция перебора массива с карточками
//    **-Обработчики событий
//       *** при открытии попапов
//       *** при закрытии попапов
//       *** при отправке форм
//       *** обработчик, открывающий попап при клике по изображению карточки 
//    ** Экспорты

import './pages/index.css';
import { initialCards } from './scripts/cards';
import { placesList, createCard, removeCard, toggleLike, addLikeEventListeners } from './scripts/card';
import { openModal, closeModal } from './scripts/modal';
import { handleFormSubmitCard } from './scripts/cardFunction';

//Функция создания карточек (вариант с forEach)
function createCards() {
  initialCards.forEach((cardData) => {
    const newCard = createCard(cardData, removeCard);
    placesList.appendChild(newCard);
  });
  addLikeEventListeners(); // Обработчик лайков для всех существующих карточек
}

createCards()

//Находим попапы
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
//Находим кнопки
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

//Открытие модального окна
editProfileButton.addEventListener('click', () => {
//console.log('Открываем попап редактирования профиля'); //Проверка
openModal(editProfilePopup)});
addCardButton.addEventListener('click', () => {
//console.log('Открываем попап добавления карточки'); //Проверка
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
// Находим форму в DOM
const formElement = editProfilePopup.querySelector('.popup__form');// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = document.querySelector('.popup__input_type_name');// Воспользуйтесь инструментом .querySelector()
const jobInput = document.querySelector('.popup__input_type_description');// Воспользуйтесь инструментом .querySelector()

//Заполняем поля формы текущими значениями
nameInput.value = document.querySelector('.profile__title').textContent;
jobInput.value = document.querySelector('.profile__description').textContent; 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

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
formElement.addEventListener('submit', handleFormSubmit); 


//Прикрепляем обработчик к форме новой карточки
const addCardForm = addCardPopup.querySelector('.popup__form');

addCardForm.addEventListener('submit', handleFormSubmitCard);