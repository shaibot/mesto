const showInputError = (formElement, formInput, errorMessage, config) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);

  formInput.classList.add(config.inputErrorClass);
  formError.textContent = errorMessage;
  formError.classList.add(config.errorClass);
  };

const hideInputError = (formElement, formInput, config) => {
  const formError = formElement.querySelector(`#${formInput.id}-error`);

  formInput.classList.remove(config.inputErrorClass);
  formError.classList.remove(config.errorClass);
  formError.textContent = '';
};

const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formElement, formInput)
    });
  });
}

//  Дизейбл кнопки
const toggleDisableBtn = (inputs, button, config) => {
  const formValid = inputs.every(input => input.validity.valid);

  if (formValid) {
    //раздизейблить
    button.classList.remove(config.inactiveButtonClass);
    button.disabled = false;
  } else {
    //задизейблить
    button.classList.add(config.inactiveButtonClass);
    button.disabled = true;
  }
}


const enableValidation = ({formSelector, inputSelector, submitButtonSelector, ...restConfig }) => {
  const formList = Array.from(document.querySelectorAll(formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}


enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});
