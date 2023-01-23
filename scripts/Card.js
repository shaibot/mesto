export class Card {
  constructor (data, cardTemplateSelector, handleClickImage) {
    this._cardTemplateSelector = cardTemplateSelector;
    this._data = data;
    this._handleClickImage = handleClickImage;
  }

    _handleDeleteCard = (event) => {
      event.target.closest('.elements__item').remove();
    }

    _handleLikeCard = (event) => {
      event.target.closest('.element__like').classList.toggle('element__like_active');
    }

 // Задача метода _getTemplate — вернуть разметку карточки через return

  _getTemplate() {
    const newCard = document
    .querySelector(this._cardTemplateSelector)
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

  return newCard;
  }

  _addEventListeners = () => {
    const deleteCardBtn = this._newCard.querySelector('.element__card-delete');
    const likeCardBtn = this._newCard.querySelector('.element__like');

    deleteCardBtn.addEventListener('click', this._handleDeleteCard);
    likeCardBtn.addEventListener('click', this._handleLikeCard);
    this._cardLink.addEventListener('click', ()=> this._handleClickImage(this._data.name, this._data.link));
  }


  createCard() {

    this._newCard = this._getTemplate();

    const cardName = this._newCard.querySelector('.element__caption');
    cardName.textContent = this._data.name;

    this._cardLink = this._newCard.querySelector('.element__image');
    this._cardLink.src = this._data.link;
    this._cardLink.alt = this._data.name;

    this._addEventListeners();

    return this._newCard;
  }
}
