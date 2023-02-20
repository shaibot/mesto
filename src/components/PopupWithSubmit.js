import { Popup } from './Popup.js'

export class PopupWithSubmit extends Popup {
  constructor(popupSelector, handleDeleteCard) {
    super(popupSelector)
    this._handleDeleteCard = handleDeleteCard
    this._formElement = this._popupElement.querySelector('.popup__form')
    this._saveButton = this._formElement.querySelector('.popup__button')
  }

  open(id, cardItem) {
    super.open()
    this._id = id;
    this._card = cardItem
  }

  setEventListeners() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault()
      this._handleDeleteCard(this._id, this._card)
    })
    super.setEventListeners()
  }

  //удалить карточку со страницы
  deleteCard(){
    this._card.remove();
  }
}
