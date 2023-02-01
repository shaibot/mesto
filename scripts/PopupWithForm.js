import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
constructor (popupSelector, handleFormSubmit) {
super(popupSelector)

this._handleFormSubmit = handleFormSubmit;
this._formElement = this._popupSelector.querySelector('.popup__form')
// достаём все элементы полей
this._inputList = this._formElement.querySelectorAll('.popup__input');

}

_getInputValues() {

  // создаём пустой объект
  this._formValues = {};

  // добавляем в этот объект значения всех полей
  this._inputList.forEach(input => {
    this._formValues[input.name] = input.value;
  });

  // возвращаем объект значений
  return this._formValues;
}

setEventListeners () {
  super.setEventListeners();
  this._formElement.addEventListener('submit', (evt) => {
    this._handleFormSubmit(evt, this._getInputValues());
    this.close();
  })
}

close () {
  super.close();
  this._formElement.reset();

}
}
