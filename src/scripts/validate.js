// Показывает ошибку
function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(
    `.popup__error.${inputElement.name}-error`
  );
  if (!errorElement) return; // Предотвращение ошибки, если элемент не найдет
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
}

// Скрывает ошибку
function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(
    `.popup__error.${inputElement.name}-error`
  );
  if (!errorElement) return; // Предотвращение ошибки, если элемент не найдет
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(config.errorClass);
}

// Проверка поля на валидность
function checkInputValidity(formElement, inputElement, config) {
  const value = inputElement.value.trim();
  const namePattern = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,30}$/;

  if (inputElement.validity.valueMissing) {
    showInputError(formElement, inputElement, "Вы пропустили это поле", config);
  } else if (
    inputElement.name === "name" ||
    inputElement.name === "place-name"
  ) {
    // Проверка названия по регулярке
    if (!namePattern.test(value)) {
      showInputError(
        formElement,
        inputElement,
        "Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы",
        config
      );
    } else {
      hideInputError(formElement, inputElement, config);
    }
  } else if (inputElement.name === "link") {
    // Проверка URL
    if (!inputElement.validity.valid) {
      showInputError(
        formElement,
        inputElement,
        "Введите корректную ссылку",
        config
      );
    } else {
      hideInputError(formElement, inputElement, config);
    }
  } else if (inputElement.validity.tooShort) {
    showInputError(
      formElement,
      inputElement,
      `Минимальное количество символов: ${inputElement.minLength}. Длина текста сейчас: ${value.length}`,
      config
    );
  } else {
    // Если ошибок нет — скрываем ошибку
    hideInputError(formElement, inputElement, config);
  }
}

// Блокировка кнопки
function toggleButtonState(inputList, buttonElement, config) {
  const isFormInvalid = inputList.some(
    (inputElement) => !inputElement.validity.valid
  );
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
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });

  toggleButtonState(inputList, buttonElement, config);
}

// Очистка валидации
function clearValidation(formElement, config) {
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) =>
    hideInputError(formElement, inputElement, config)
  );
  toggleButtonState(inputList, buttonElement, config);
}

// Запускает валидацию
function enableValidation(config) {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}

export { enableValidation, clearValidation };
