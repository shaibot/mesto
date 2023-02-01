import { UserInfo } from './UserInfo.js'
import { FormValidator } from './FormValidator.js'
import initialCards from './data.js'
import { Card } from './Card.js'
import Section from './Section.js'
import { PopupWithImage } from './PopupWithImage.js'
import { PopupWithForm } from './PopupWithForm.js'



//находим попапы
const popupEditProfile = document.querySelector('#popup-edit-profile')
const popupCardAdd = document.querySelector('#popup-card-add')
// const popupImageBig = document.querySelector('#popup-image-big')

//контент внутри попапов
// const formEditProfile = popupEditProfile.querySelector('.popup__form')
const nameInput = popupEditProfile.querySelector('.popup__input_name')
const jobInput = popupEditProfile.querySelector('.popup__occupation')
// const profileName = document.querySelector('.profile__name')
// const profileOccupation = document.querySelector('.profile__occupation')
// const popupImageBigItem = popupImageBig.querySelector('.popup__image')
// const popupImageBigName = popupImageBig.querySelector('.popup__image-caption')
const cardSubmitBtn = document.querySelector('#card-submit')
//Кнопки открытия попапов
const popupOpenButtonElement = document.querySelector('.profile__edit-button')
const popupCardAddOpenButtonElement = document.querySelector('.profile__button')

//Кнопки закрытия
const popupCloseButtonElement = popupEditProfile.querySelector('.popup__close')
const popupCloseCardAdd = popupCardAdd.querySelector('.popup__close')

// Селекторы
const popupImageSelector = '#popup-image-big'
const cardListContainer = '.elements__list'
const cardTemplateSelector = '#card-template'


// Экземпляры классов
const popupWithBigImage = new PopupWithImage (popupImageSelector);
popupWithBigImage.setEventListeners();

const handleCardClick = (name, link) => {
  popupWithBigImage.open(name, link);
}

const createNewCard = (item) => {
  const newCard = new Card(item, cardTemplateSelector, handleCardClick)
  const cardElement = newCard.createCard()
  console.log(cardElement)

  return cardElement
}

const cardElementList = new Section ({
  items: initialCards,
  renderer: (item) => {
    const card = createNewCard(item);
    cardElementList.addItem(card);
}},
cardListContainer);

cardElementList.renderItems();





const userInfo = new UserInfo ({
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation'
});


const handleEditProfileFormSubmit = (evt, formValues) => {
  evt.preventDefault();
  userInfo.setUserInfo(formValues.name, formValues.info);
}

const popupEditProfileForm = new PopupWithForm ('#popup-edit-profile', handleEditProfileFormSubmit)
popupEditProfileForm.setEventListeners();

const handleCardAddFormSubmit = (evt, item) => {
  evt.preventDefault();
  const card = createNewCard(item);
  cardElementList.addItem(card);
}

const popupAddCardForm = new PopupWithForm('#popup-card-add', handleCardAddFormSubmit)
popupAddCardForm.setEventListeners();






// const popupCloseImageBig = popupImageBig.querySelector('.popup__close')

//Добавление const для элементов card

// const cardSubmitBtn = popupCardAdd.querySelector('#card-submit')
// const cardListElement = document.querySelector('.elements__list')
// const formAddCard = document.querySelector('#form-for-card')
// const formInputCardName = document.querySelector('.name')
// const formInputCardLink = document.querySelector('.link')









//Для валидации
const cardAddForm = popupCardAdd.querySelector('.popup__form')
const profileEditForm = popupEditProfile.querySelector('.popup__form')

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

const formAddCardValidator = new FormValidator(validationConfig, cardAddForm)
const profileEditFormValidator = new FormValidator(
  validationConfig,
  profileEditForm,
)

formAddCardValidator.enableValidation()
profileEditFormValidator.enableValidation()

// Функции карточек: удаление, добавление, лайк

//Отрисовка карточек с помощью метода renderer класса Section









// Реализация работы попапов на странице с помощью Popup и PopupWithImage и PopupWithForm









// const handleOpenBigImage = (name, link) => {
//   popupImageBigItem.src = link
//   popupImageBigItem.alt = name
//   popupImageBigName.textContent = name
//   openPopup(popupImageBig)
  // popupWithBigImage.open();
//}

// const renderInitialCards = (data) => {
//   cardListElement.prepend(createNewCard(data))
// }

// initialCards.forEach((data) => {
//   renderInitialCards(data)
// })

//Функция отправки формы карточки
// const handleFormSubmitAddCard = (e) => {
//   e.preventDefault();
//   renderInitialCards({
//     name: formInputCardName.value,
//     link: formInputCardLink.value,
//   })
//   e.target.reset()
//   closePopup(popupCardAdd)
// }

//Функция открытия-закрытия popup

// function openPopup(popup) {
//   popup.classList.add('popup_opened')
//   document.addEventListener('keydown', closePopupOnEsc)
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened')
//   document.removeEventListener('keydown', closePopupOnEsc)
// }

//Закрытие попапов при клике по overlay

// const closePopupByClickOnOverlay = (e) => {
//   if (!e.target.closest('.popup__container')) {
//     closePopup(e.target)
//   }
// }

//Функция для кнопки Сохранить popup profile
// function submitEditProfileForm(evt) {
//   evt.preventDefault()
//   profileName.textContent = nameInput.value
//   profileOccupation.textContent = jobInput.value
//   popupEditProfileForm.close();
// }

// Функция закрытия попапов по нажатию на Esc
// function closePopupOnEsc(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened')
//     closePopup(openedPopup)
//   }
// }

//Слушатели

popupOpenButtonElement.addEventListener('click', () => {
  profileEditFormValidator.resetValidation()
  const {name, info} = userInfo.getUserInfo();

  nameInput.value = name;
  jobInput.value = info;
  popupEditProfileForm.open();
})

popupCloseButtonElement.addEventListener('click', function () {
  popupEditProfileForm.close();
})

popupCardAddOpenButtonElement.addEventListener('click', function () {
  cardSubmitBtn.setAttribute('disabled', true)
  // cardSubmitBtn.classList.add('popup__button_disabled')
  // formAddCardValidator.resetValidation()
  // formAddCard.reset()
  // openPopup(popupCardAdd)
  formAddCardValidator.resetValidation();
  popupAddCardForm.open();
})

popupCloseCardAdd.addEventListener('click', function () {
  popupAddCardForm.close();
})

// popupCloseImageBig.addEventListener('click', function () {
//   closePopup(popupImageBig)
// // })
// formEditProfile.addEventListener('submit', submitEditProfileForm)

// formAddCard.addEventListener('submit', handleFormSubmitAddCard)

// popupEditProfile.addEventListener('click', closePopupByClickOnOverlay)
// popupCardAdd.addEventListener('click', closePopupByClickOnOverlay)
// popupImageBig.addEventListener('click', closePopupByClickOnOverlay)
