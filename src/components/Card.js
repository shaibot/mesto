export class Card {
  constructor(data, cardTemplateSelector, handleCardClick) {
    this._cardTemplateSelector = cardTemplateSelector
    this._data = data
    this._handleCardClick = handleCardClick
    this._newCard = this._getTemplate()
    this._deleteCardBtn = this._newCard.querySelector('.element__card-delete')
    this._likeCardBtn = this._newCard.querySelector('.element__like')
    this._cardName = this._newCard.querySelector('.element__caption')
    this._cardLink = this._newCard.querySelector('.element__image')
  }

  _handleDeleteCard = (event) => {
    event.target.closest('.elements__item').remove()
  }

  _handleLikeCard = (event) => {
    event.target
      .closest('.element__like')
      .classList.toggle('element__like_active')
  }

  _getTemplate() {
    const newCard = document
      .querySelector(this._cardTemplateSelector)
      .content.querySelector('.elements__item')
      .cloneNode(true)

    return newCard
  }

  _addEventListeners = () => {
    this._deleteCardBtn.addEventListener('click', this._handleDeleteCard)
    this._likeCardBtn.addEventListener('click', this._handleLikeCard)
    this._cardLink.addEventListener('click', () =>
      this._handleCardClick(this._data.name, this._data.link),
    )
  }

  createCard() {
    this._cardName.textContent = this._data.name
    this._cardLink.src = this._data.link
    this._cardLink.alt = this._data.name

    this._addEventListeners()

    return this._newCard
  }
}
