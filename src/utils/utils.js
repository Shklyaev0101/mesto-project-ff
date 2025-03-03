// Функция для управления текстом кнопки во время загрузки
function renderLoading(
  isLoading,
  button,
  buttonText = "Сохранить",
  loadingText = "Сохранение..."
) {
  button.textContent = isLoading ? loadingText : buttonText;
}

// Универсальная функция обработки запросов с изменением текста кнопки и очисткой формы
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();

  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;

  renderLoading(true, submitButton, initialText, loadingText);

  request()
    .then(() => {
      evt.target.reset(); // Очищаем форму после успешного запроса
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(false, submitButton, initialText);
    });
}

export { renderLoading, handleSubmit };
