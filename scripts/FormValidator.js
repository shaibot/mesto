export class FormValidator {
  constructor(config, form) {
  this._form = form;
  this._config = config;
  }

_showInputError = (input, errorMessage) => {
  const errorElement = this._form.querySelector(`#${input.id}-error`);

  input.classList.add(this._config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(this._config.errorClass);
}

_hasInvalidInput = () => {
  return this._inputList.some((input) => {
    return !input.validity.valid;
  })
}

resetValidation = () => {

  this._inputList.forEach((input) => {
    this._hideInputError(input);
  });
}

_hideInputError = (input) => {
  const errorElement = this._form.querySelector(`#${input.id}-error`);

  input.classList.remove(this._config.inputErrorClass);
  errorElement.classList.remove(this._config.errorClass);
  errorElement.textContent = '';
}

_checkInputValidity = (input) => {
  if (!input.validity.valid) {
    this._showInputError(input, input.validationMessage);
  } else {
    this._hideInputError(input);
  }
}

_toggleBtnState = (button) => {
  if (this._hasInvalidInput(this._inputList)) {
    //задизейблить
    button.classList.add(this._config.inactiveButtonClass);
    button.disabled = true;
  } else {
    //раздизейблить
    button.classList.remove(this._config.inactiveButtonClass);
    button.disabled = false;
  }
};

enableValidation() {
  this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
  const button = this._form.querySelector(this._config.submitButtonSelector);

  this._toggleBtnState(button);
  this._inputList.forEach((input) => {
    input.addEventListener('input', () => {
      this._checkInputValidity(input);
      this._toggleBtnState(button);
    });
  });
}
}
