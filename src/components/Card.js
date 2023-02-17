export class Card {
  constructor(
    data,
    userId,
    cardTemplateSelector,
    { handleCardClick, handleLikeClick, handleDeleteBtnClick },
  ) {
    this._data = data
    this._cardId = data._id
    this._userId = userId
    this._cardTemplateSelector = cardTemplateSelector
    this._handleCardClick = handleCardClick
    this._handleLikeClick = handleLikeClick
    this._handleDeleteBtnClick = handleDeleteBtnClick
    this._newCard = this._getTemplate()
    this._deleteCardBtn = this._newCard.querySelector('.element__card-delete')
    this._likeCardBtn = this._newCard.querySelector('.element__like')
    this._cardName = this._newCard.querySelector('.element__caption')
    this._cardLink = this._newCard.querySelector('.element__image')
    this._counterLikes = this._newCard.querySelector('.element__counter-likes')
    this._ownerId = data.owner._id
    this._likes = data.likes
  }


// Отображение количества лайков
renderLikes() {
  this._counterLikes.textContent = this._cardLikes.length
  this.switchLikes(this._userId)
}

// Удаление карточки
  _handleDeleteCard = () => {
    this._newCard.remove()
  }

  // Визуально поставить и снять лайк
  _handleLikeCard = () => {
    this._likeCardBtn.classList.toggle('element__like_active')
  }

  // Проверить есть ли лайк юзера
  checkAvailabilityLike() {
    return this._cardLikes.some((like) => {
      return like._id === this._userId
    })
  }

  // Установить лайк
  setLikes(likesList) {
    this._cardLikes = likesList
  }

  // ID карточки
  getIdCard() {
    return this._cardId
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
    this._counterLikes.textContent = this._likes.length
    // if (this._ownerId !== this._userId) {
    //   this._deleteCardBtn.remove()
    // }
    // this.renderLikes()
    this._addEventListeners()

    return this._newCard
  }
}

/////////////////////////

// export class Card {
//   constructor(
//     data,
//     userId,
//     cardSelector,
//     { handleCardClick, handleLikeClick, handleDeleteBtnClick },
//   ) {
//     this._cardSelector = cardSelector
//     this._handleCardClick = handleCardClick
//     this._handleLikeClick = handleLikeClick
//     this._name = data.name
//     this._link = data.link
//     this._cardId = data._id
//     this._cardLikes = data.likes
//     this._ownerId = data.owner._id
//     this._userId = userId
//     this._handleDeleteBtnClick = handleDeleteBtnClick
//   }

//   // Удаление карточки
//   deleteCard() {
//     this._element.remove()
//   }

//   _getTemplate() {
//     const cardElement = document
//       .querySelector(this._cardSelector)
//       .content.querySelector('.elements__item')
//       .cloneNode(true)

//     return cardElement
//   }

//   generateCard() {
//     this._element = this._getTemplate()
//     this._image = this._element.querySelector('.element__image')
//     this._deleteButton = this._element.querySelector('.element__delete-button')
//     this._likeButton = this._element.querySelector('.element__like-button')
//     if (this._ownerId !== this._userId) {
//       this._deleteButton.remove()
//     }
//     this._countLikes = this._element.querySelector('.element__like-count')
//     this.renderLikes()
//     this._setEventListeners()
//     this._image.src = this._link
//     this._image.alt = this._name
//     this._element.querySelector('.element__figcaption').textContent = this._name

//     return this._element
//   }

//   // Определяет наличие своего лайка
//   checkAvailabilityLike() {
//     return this._cardLikes.some((like) => {
//       return like._id === this._userId
//     })
//   }
//   // Установить лайки
//   setLikes(likesList) {
//     this._cardLikes = likesList
//   }
//   // Получить ID  карточки
//   getCardId() {
//     return this._cardId
//   }

//   // Закрашивает и снимает метку лайка
//   switchLikes() {
//     if (this.checkAvailabilityLike(this._userId)) {
//       this._likeButton.classList.add('element__like-button_active')
//     } else {
//       this._likeButton.classList.remove('element__like-button_active')
//     }
//   }

//   // Показать количество лайки
//   renderLikes() {
//     this._countLikes.textContent = this._cardLikes.length
//     this.switchLikes(this._userId)
//   }

//   _setEventListeners() {
//     this._likeButton.addEventListener('click', () => {
//       this._handleLikeClick()
//     })

//     this._deleteButton.addEventListener('click', () => {
//       this._handleDeleteBtnClick()
//     })

//     this._image.addEventListener('click', () => {
//       this._handleCardClick(this._name, this._link)
//     })
//   }
// }
