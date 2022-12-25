//показать ошибку
const showInputError = (formElement, input, errorMessage, config) => {
  const formError = formElement.querySelector(`#${input.id}-error`);

  input.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
};

//скрыть ошибку
const hideInputError = (formElement, input, config) => {
  const formError = formElement.querySelector(`#${input.id}-error`);

  input.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
};

//проверить валидность
const hasInvalidInput = (inputList) => {

  return inputList.some((input) => {
    return !input.validity.valid;
  })
};

//если не валидно, показать ошибку, если валидно, скрыть ошибку
const checkInputValidity = (formElement, input, config) => {
  if (!input.validity.valid) {
    showInputError(formElement, input, input.validationMessage, config);
  } else {
    hideInputError(formElement, input, config);
  }
};

//сбросить валидацию
const resetValidation = (formElement, config) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];

  inputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
}

//  Дизейбл кнопки
const toggleBtnState = (inputList, button, config) => {
  if (hasInvalidInput(inputList)) {
    //задизейблить
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  } else {
    //раздизейблить
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  }
}

//функция слушателя, чтобы проверял валидность при инпуте и дизейблил/раздизейблил кнопку
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);

  toggleBtnState(inputList, button, config);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkInputValidity(formElement, input, config);
      toggleBtnState(inputList, button, config);
    });
  });
  formElement.addEventListener('reset', () => {
    setTimeout(() => {
      resetValidation(formElement, config);
      toggleBtnState(inputList, button, config);
    }, 0)
  })
}



const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});
