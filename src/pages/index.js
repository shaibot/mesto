import { UserInfo } from '../components/UserInfo.js'
import { FormValidator } from '../components/FormValidator.js'
import {
  initialCards,
  popupOpenButtonElement,
  popupCardAddOpenButtonElement,
  popupImageSelector,
  cardListContainer,
  cardTemplateSelector,
  cardAddForm,
  profileEditForm,
  validationConfig,
} from '../utils/constants.js'
import { Card } from '../components/Card.js'
import Section from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from '../components/PopupWithForm.js'
import '../pages/index.css';

const popupWithBigImage = new PopupWithImage(popupImageSelector)
popupWithBigImage.setEventListeners()

const handleCardClick = (name, link) => {
  popupWithBigImage.open(name, link)
}

const createNewCard = (item) => {
  const newCard = new Card(item, cardTemplateSelector, handleCardClick)
  const cardElement = newCard.createCard()

  return cardElement
}

const cardElementList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = createNewCard(item)
      cardElementList.addItem(card)
    },
  },
  cardListContainer,
)

cardElementList.renderItems()

const userInfo = new UserInfo({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation',
})

const handleEditProfileFormSubmit = (evt, formValues) => {
  evt.preventDefault()
  userInfo.setUserInfo(formValues.name, formValues.info)
}

const popupEditProfileForm = new PopupWithForm(
  '#popup-edit-profile',
  handleEditProfileFormSubmit,
)
popupEditProfileForm.setEventListeners()

const handleCardAddFormSubmit = (evt, item) => {
  evt.preventDefault()
  const card = createNewCard(item)
  cardElementList.addItem(card)
}

const popupAddCardForm = new PopupWithForm(
  '#popup-card-add',
  handleCardAddFormSubmit,
)
popupAddCardForm.setEventListeners()

const formAddCardValidator = new FormValidator(validationConfig, cardAddForm)
const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm,
)

formAddCardValidator.enableValidation()
profileEditFormValidator.enableValidation()

popupOpenButtonElement.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  popupEditProfileForm.setInputValues(userInfo.getUserInfo())

  popupEditProfileForm.open()
})

popupCardAddOpenButtonElement.addEventListener('click', function () {
  formAddCardValidator.resetValidation()
  popupAddCardForm.open()
})
