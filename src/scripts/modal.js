//  * Работа модальных окон (Попапов)
//      **  Функция openModal (должна принимать в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.)
//      **  Функция closeModal (должна принимать в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие.)
//      **  Функция открытия попапа с изображением
//      **  Экспорт

// Функция открытия модального окна (попапа)
function openModal(popup) {
  if (!popup) return; //Проверяем,что элемент существует

  popup.classList.add("popup_is-opened"); // Добавляем класс для открытия
  document.addEventListener("keydown", closeModalOnEscape); // Добавляем обработчик закрытия по Escape
}

// Функция закрытия модального окна (попапа)
function closeModal(popup) {
  if (!popup) return; //Проверяем,что элемент существует

  popup.classList.remove("popup_is-opened"); // Удаляем класс открытия
  document.removeEventListener("keydown", closeModalOnEscape); // Убираем обработчик закрытия по Escape
}

// Функция закрытия модального окна (попапа) Escape'ом
function closeModalOnEscape(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

// Экспорты функций
export { openModal, closeModal };
