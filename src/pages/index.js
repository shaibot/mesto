import { UserInfo } from '../components/UserInfo'
import { FormValidator } from '../components/FormValidator'
import {
  popupImageSelector,
  profileEditForm,
  cardAddForm,
  popupOpenButtonElement,
  popupCardAddOpenButtonElement,
  cardTemplateSelector,
  cardListContainer,
  validationConfig,
  profileSelector,
  profileName,
  profileOccupation,
  profileAvatar,
  popupInputLinkAvatar,
  editAvatarBtn,
  popupFormEditAvatar,
  popupEditAvatarSelector
} from '../utils/constants'
import { Card } from '../components/Card'
import Section from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage'
import { PopupWithForm } from '../components/PopupWithForm'
import { PopupWithSubmit } from '../components/PopupWithSubmit'
import Api from '../components/Api'
import '../pages/index.css'

// Получение данных с сервера
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-59',
  headers: {
    authorization: '828326d9-3e7a-4e87-bb3e-57d75ba5d596',
    'Content-Type': 'application/json',
  },
})

let userId = null

// Получение данных пользователя
api
  .getUserInfo()
  .then((data) => {
    profileName.textContent = data.name
    profileOccupation.textContent = data.about
    profileAvatar.src = data.avatar
    userId = data._id
  })
  .catch((error) => {
    console.log(error)
  })

// Получение карточек с сервера
api
  .getInitialCards()
  .then((cards) => {
    renderInitialCards(cards)
  })
  .catch((error) => {
    console.log(error)
  })

// Создание новой карточки
const createNewCard = (item) => {
  const newCard = new Card(item, userId, cardTemplateSelector, {
    handleCardClick: (name, link) => {
      popupWithBigImage.open(name, link)
    },
    handleLikeClick: () => {
      const cardLike = newCard.checkAvailabilityLike()
      const resultApi = cardLike
        ? api.deleteLike(newCard.getIdCard())
        : api.addLike(newCard.getIdCard())
      resultApi
        .then((item) => {
          newCard.addLike(item.likes)
          newCard.renderLikes()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    handleDeleteBtnClick: () => {
      popupWithSubmit.open(newCard)
    },
  })
  return newCard
}

//Отрисовка карточек
const renderInitialCards = (cards) => {
  const cardElementList = new Section(
    {
      items: cards,
      renderer: (item) => {
        const card = createNewCard(item)
        cardElementList.addItem(card)
      },
    },
    cardListContainer,
  )

  cardElementList.renderItems()
}




// Добавление новой карточки
const addNewCard = (card) => {
  popupAddCardForm.savingBtn('Сохранение...')
  api
    .addNewCard(card.name, card.link)
    .then((item) => {
      const newCard = createNewCard(item)
      const cardElement = newCard.createCard()
      cardListContainer.prepend(cardElement)
    })
    .then(() => {
      popupAddCardForm.close()
      popupAddCardForm.savingBtn('Сохранить')
    })
    .catch((error) => {
      console.log(error)
    })
}

// Удаление карточки
const handleDeleteCard = (card) => {
  api
    .deleteCard(card.getIdCard())
    .then(() => {
      popupWithSubmit.close()
      card.deleteCard()
    })
    .catch((error) => {
      console.log(error)
    })
}


// Редактирование аватара пользователя
const handleEditAvatar = () => {
  editAvatarPopup.savingBtn('Сохранение...')
  api
    .editUserAvatar(popupInputLinkAvatar.value)
    .then(() => {
      profileAvatar.src = popupInputLinkAvatar.value
      editAvatarPopup.close()
      editAvatarPopup.savingBtn('Сохранить')
    })
    .catch((error) => {
      console.log(error)
    })
}

// Редактирование данных пользователя
const handleEditProfileFormSubmit = (item) => {
  popupEditProfileForm.savingBtn('Сохранение...')
  api
    .editUserInfo(item.name, item.job)
    .then(() => {
      userInfo.setUserInfo(item)
      popupEditProfileForm.close()
      popupEditProfileForm.savingBtn('Сохранить')
    })
    .catch((error) => {
      console.log(error)
    })
}

// Попап редактирования аватара
const editAvatarPopup = new PopupWithForm(
  popupEditAvatarSelector,
  handleEditAvatar,
)
editAvatarPopup.setEventListeners()

// Попап редактирования профиля
const userInfo = new UserInfo(profileSelector)

const popupEditProfileForm = new PopupWithForm(
  '#popup-edit-profile',
  handleEditProfileFormSubmit,
)
popupEditProfileForm.setEventListeners()

// Попап подтверждения удаления карточки
const popupWithSubmit = new PopupWithSubmit(
  '#popup-card-delete',
  (card) => handleDeleteCard(card),
)
popupWithSubmit.setEventListeners()


// Валидация инпутов в попапе добавления карточки
const formAddCardValidator = new FormValidator(validationConfig, cardAddForm)
formAddCardValidator.enableValidation()

// Валидация в попапе редактирования профиля
const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm,
)

profileEditFormValidator.enableValidation()

// Валидация в попапе редактирования аватара
const avatarEditFormValidator = new FormValidator(validationConfig, popupFormEditAvatar)
avatarEditFormValidator.enableValidation()



// const handleEditProfileFormSubmit = (evt, formValues) => {
//   evt.preventDefault()
//   userInfo.setUserInfo(formValues.name, formValues.info)
// }



// const handleCardAddFormSubmit = (evt, item) => {
//   evt.preventDefault()
//   const card = createNewCard(item)
//   cardElementList.addItem(card)
// }

//Попап для добавления карточки
const popupAddCardForm = new PopupWithForm(
  '#popup-card-add',
  addNewCard,
)
popupAddCardForm.setEventListeners()


// Попап с большой картинкой
const popupWithBigImage = new PopupWithImage(popupImageSelector)
popupWithBigImage.setEventListeners()


//Кнопка  - открыть попап редактирования профиля
popupOpenButtonElement.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  popupEditProfileForm.setInputValues(userInfo.getUserInfo())

  popupEditProfileForm.open()
})

//Кнопка - открыть попап добавления карточки
popupCardAddOpenButtonElement.addEventListener('click', function () {
  formAddCardValidator.resetValidation()
  popupAddCardForm.open()
})

//Кнопка - открыть попап редактирования аватара
editAvatarBtn.addEventListener('click', () => {
  editAvatarPopup.open()
})
