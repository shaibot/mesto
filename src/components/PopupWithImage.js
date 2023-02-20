import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImageBigItem = this._popupElement.querySelector('.popup__image')
    this._popupImageBigName = this._popupElement.querySelector(
      '.popup__image-caption',
    )
  }

  open(name, link) {
    this._popupImageBigItem.src = link
    this._popupImageBigItem.alt = name
    this._popupImageBigName.textContent = name

    super.open()
  }
}
