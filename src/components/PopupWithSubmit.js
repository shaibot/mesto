import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector)
    this._handleDeleteCard = handleDeleteCard
    this._formElement = this._popupSelector.querySelector('.popup__form')
    this._saveButton = this._formElement.querySelector('.popup__button')
  }

  open(cardItem) {
    this._card = cardItem
    super.open()
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleDeleteCard(this._card)
    })
    super.setEventListeners()
  }
}
