// Показывает ошибку
function showInputError(formElement, inputElement, errorMessage, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }

  // Скрывает ошибку
  function hideInputError(formElement, inputElement, config) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
  }
  
  // Проверка поля
  function checkInputValidity(formElement, inputElement, config) {
  if (inputElement.validity.valueMissing) {
    // Ошибка, если поле пустое
    showInputError(formElement, inputElement, "Вы пропустили это поле", config);
  } else if (inputElement.validity.tooShort) {
    // Ошибка, если введено менее 2 символов
    showInputError(
      formElement,
      inputElement,
      `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${inputElement.value.length}`,
      config
    );
  } else {
    // Если ошибок нет — скрываем ошибку
    hideInputError(formElement, inputElement, config);
  }
}
  
  // Блокировка кнопки
  function toggleButtonState(inputList, buttonElement, config) {
    const isFormInvalid = inputList.some(inputElement => !inputElement.validity.valid);
    if (isFormInvalid) {
      buttonElement.classList.add(config.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.remove(config.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  
  // Обработчики событий
  function setEventListeners(formElement, config) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        checkInputValidity(formElement, inputElement, config);
        toggleButtonState(inputList, buttonElement, config);
      });
    });
  
    toggleButtonState(inputList, buttonElement, config);
  }
  
  // Запускает валидацию
  function enableValidation(config) {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
      setEventListeners(formElement, config);
    });
  }

  export { showInputError, hideInputError, checkInputValidity, toggleButtonState, setEventListeners, enableValidation};