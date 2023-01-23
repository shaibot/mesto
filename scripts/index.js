import {FormValidator} from './FormValidator.js';
import initialCards from './data.js';
import { Card } from './Card.js';

//находим попапы
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupCardAdd = document.querySelector('#popup-card-add');
const popupImageBig = document.querySelector('#popup-image-big');

//контент внутри попапов
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.popup__input_name');
const jobInput = popupEditProfile.querySelector('.popup__occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');
const popupImageBigItem = popupImageBig.querySelector('.popup__image');
const popupImageBigName = popupImageBig.querySelector('.popup__image-caption');

//Кнопки открытия попапов
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCardAddOpenButtonElement = document.querySelector('.profile__button');

//Кнопки закрытия
const popupCloseButtonElement = popupEditProfile.querySelector('.popup__close');
const popupCloseCardAdd = popupCardAdd.querySelector('.popup__close');
const popupCloseImageBig = popupImageBig.querySelector('.popup__close');

//Добавление const для элементов card

const cardSubmitBtn = popupCardAdd.querySelector('#card-submit');
const cardListElement = document.querySelector('.elements__list');
const formAddCard = document.querySelector('#form-for-card');
const formInputCardName = document.querySelector('.name');
const formInputCardLink = document.querySelector('.link');
const cardTemplateSelector = '#card-template';

//Для валидации
const cardAddForm = popupCardAdd.querySelector('.popup__form');
const profileEditForm = popupEditProfile.querySelector('.popup__form');

const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

const formAddCardValidator = new FormValidator(validationConfig, cardAddForm);
const profileEditFormValidator = new FormValidator(validationConfig, profileEditForm);

formAddCardValidator.enableValidation();
profileEditFormValidator.enableValidation();


// Функции карточек: удаление, добавление, лайк

const handleOpenBigImage = (name, link) => {
    popupImageBigItem.src = link;
    popupImageBigItem.alt = name;
    popupImageBigName.textContent = name;
    openPopup(popupImageBig);
}

const createNewCard = (data) => {
  const newCard = new Card (data, cardTemplateSelector, handleOpenBigImage);
  const cardElement = newCard.createCard();

  return cardElement;
}

const renderInitialCards = (data) => {
  cardListElement.prepend(createNewCard(data));
}

initialCards.forEach((data) => {
  renderInitialCards(data);
})

//Функция отправки формы карточки
const handleFormSubmitAddCard = (e) => {
  e.preventDefault();
  renderInitialCards({
    name: formInputCardName.value,
    link: formInputCardLink.value,
  });
  e.target.reset();
  closePopup(popupCardAdd);
}

//Функция открытия-закрытия popup

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupOnEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupOnEsc);
}

//Закрытие попапов при клике по overlay

const closePopupByClickOnOverlay = (e) => {
  if (!e.target.closest('.popup__container')) {
    closePopup(e.target);
  }
}

//Функция для кнопки Сохранить popup profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

// Функция закрытия попапов по нажатию на Esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

//Слушатели

popupOpenButtonElement.addEventListener('click', function () {
  profileEditFormValidator.resetValidation();
  openPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

popupCloseButtonElement.addEventListener('click', function () {
  closePopup(popupEditProfile);
})

popupCardAddOpenButtonElement.addEventListener('click', function () {
  cardSubmitBtn.setAttribute('disabled', true);
  cardSubmitBtn.classList.add('popup__button_disabled');
  formAddCardValidator.resetValidation();
  formAddCard.reset();
  openPopup(popupCardAdd);

})

popupCloseCardAdd.addEventListener('click', function () {
  closePopup(popupCardAdd);
})

popupCloseImageBig.addEventListener('click', function () {
  closePopup(popupImageBig);
})
formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', handleFormSubmitAddCard);

popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupCardAdd.addEventListener('click', closePopupByClickOnOverlay);
popupImageBig.addEventListener('click', closePopupByClickOnOverlay);

