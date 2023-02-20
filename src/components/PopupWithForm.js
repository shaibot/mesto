import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector)

    this._handleFormSubmit = handleFormSubmit
    this._formElement = this._popupElement.querySelector('.popup__form')
    this._inputList = this._formElement.querySelectorAll('.popup__input')
    this._saveBtn = this._formElement.querySelector('.popup__button')
  }

  savingBtn(text) {
    this._saveBtn.value = text
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      // тут вставляем в `value` инпута данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name]
    })
  }

  _getInputValues() {
    this._formValues = {}
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value
    })
    return this._formValues
  }

  setEventListeners() {
    super.setEventListeners()
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleFormSubmit(this._getInputValues())
    })
  }

  close() {
    super.close()
    this._formElement.reset()
  }
}
