const forms = [...document.querySelectorAll('.popup__form')];
const inputs = [...document.querySelectorAll('.popup__input')];

const checkInputValidity = (input, config) => {
  const error = document.querySelector(`#${input.id}-error`);

  if (input.validity.valid) {
    error.textContent = '';
    error.classList.remove(config.errorClass);
    input.classList.remove(config.inputErrorClass);
  } else {
    error.textContent = input.validationMessage;
    error.classList.add(config.errorClass);
    input.classList.add(config.inputErrorClass);

  }
}

//Дизейбл кнопки
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


// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, ...restConfig }) => {

  const forms = [...document.querySelectorAll(formSelector)];

  forms.forEach(form => {
    const inputs = [...form.querySelectorAll(inputSelector)];
    const button = form.querySelector(submitButtonSelector);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
    })

    inputs.forEach(input => {
      input.addEventListener('input', () => {
        //Показать ошибку
        checkInputValidity(input, restConfig);
        //Задизейблить кнопку
        toggleDisableBtn(inputs, button, restConfig);
      })
    })
  })
}

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});







