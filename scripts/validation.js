// const formElement = document.querySelector('.popup__form');
// const formInput = formElement.querySelector('.popup__input');

// const formError = formElement.querySelector(`.${formInput.id}-error`);

const showInputError = (formElement, formInput, errorMessage) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add('popup__input_type_error');
  formError.textContent = errorMessage;
  formError.classList.add('popup__error_visible');
  };

const hideInputError = (formElement, formInput,) => {
  const formError = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove('popup__input_type_error');
  formError.classList.remove('popup__error_visible');
  formError.textContent = '';
};

const checkInputValidity = (formElement, formInput) => {
  if (!formInput.validity.valid) {
    showInputError(formElement, formInput, formInput.validationMessage);
  } else {
    hideInputError(formElement, formInput);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

  inputList.forEach((formInput) => {
    formInput.addEventListener('input', () => {
      checkInputValidity(formElement, formInput)
    });
  });
}

const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

enableValidation();
