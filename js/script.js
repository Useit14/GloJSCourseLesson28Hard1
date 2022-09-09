const filterByType = (type, ...values) =>
    //фильтруем массив по типу и возвращаем отфильтованный массив дальше
    values.filter((value) => typeof value === type),
  hideAllResponseBlocks = () => {
    //получаем массив NodeList элементов
    const responseBlocksArray = Array.from(
      document.querySelectorAll("div.dialog__response-block")
    );
    //скрываем все элементы массива
    responseBlocksArray.forEach((block) => (block.style.display = "none"));
  },
  showResponseBlock = (blockSelector, msgText, spanSelector) => {
    hideAllResponseBlocks();
    //скрываем блок ответа
    document.querySelector(blockSelector).style.display = "block";
    //если передан третий параметр, присваиваем этому блоку сообщение
    if (spanSelector) {
      document.querySelector(spanSelector).textContent = msgText;
    }
  },
  showError = (msgText) =>
    //показываем сообщение об ошибке
    showResponseBlock(".dialog__response-block_error", msgText, "#error"),
  showResults = (msgText) =>
    //показываем сообщение-ответ(успех)
    showResponseBlock(".dialog__response-block_ok", msgText, "#ok"),
  showNoResults = () => showResponseBlock(".dialog__response-block_no-results"), //показывам нейтральное сообщение
  tryFilterByType = (type, values) => {
    try {
      //генерим функцию в рантайме, а затем вызываем ее
      const valuesArray = eval(`filterByType('${type}', ${values})`).join(", ");
      debugger;
      //в зависимости получили ли данные, генерим определенное сообщение
      const alertMsg = valuesArray.length
        ? `Данные с типом ${type}: ${valuesArray}`
        : `Отсутствуют данные типа ${type}`;
      //показываем его
      showResults(alertMsg);
    } catch (e) {
      showError(`Ошибка: ${e}`); //обрабатываем ошибку
    }
  };

//получаем кнопку
const filterButton = document.querySelector("#filter-btn");

//обработчик события на клик по кнопке
filterButton.addEventListener("click", (e) => {
  //инициализация переменных - получение инпутов
  const typeInput = document.querySelector("#type");
  const dataInput = document.querySelector("#data");

  //проверка на пустому
  if (dataInput.value === "") {
    //устанавливаем специальное сообщение для инпута, чтобы воспроизвести позже
    dataInput.setCustomValidity("Поле не должно быть пустым!");
    //Отображаем пустой блок
    showNoResults();
  } else {
    //устанавливаем специальное сообщение для инпута, чтобы воспроизвести позже
    dataInput.setCustomValidity("");
    //отменяем привычное действие браузера
    e.preventDefault();
    //точка входа в главный метод-извлечение данных указанного типа
    tryFilterByType(typeInput.value.trim(), dataInput.value.trim());
  }
});
