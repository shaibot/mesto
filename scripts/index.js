import initialCards from './data.js';

//находим попапы
const popupEditProfile = document.querySelector('#popup-edit-profile');
const popupCardAdd = document.querySelector('#popup-card-add');
const popupImageBig = document.querySelector('#popup-image-big');

//контент внутри попапов
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = popupEditProfile.querySelector('.input_name');
const jobInput = popupEditProfile.querySelector('.popup_occupation');
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

const cardListElement = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
const formAddCard = document.querySelector('#form-for-card');
const formInputCardName = document.querySelector('.name');
const formInputCardLink = document.querySelector('.link');

// Функции карточек: удаление, добавление, лайк

const handleDeleteCard = (event) => {
  event.target.closest('.elements__item').remove();
}

const handleLikeCard = (event) => {
  event.target.closest('.element__like').classList.toggle('element__like_active');
}

const createCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardName = newCard.querySelector('.element__caption');
  cardName.textContent = item.name;

  const cardLink = newCard.querySelector('.element__image');
  cardLink.src = item.link;

  const cardLinkAlt = newCard.querySelector('.element__image');
  cardLinkAlt.alt = item.name;

  const deleteCardBtn = newCard.querySelector('.element__card-delete');
  deleteCardBtn.addEventListener('click', handleDeleteCard);

  const likeCardBtn = newCard.querySelector('.element__like');
  likeCardBtn.addEventListener('click', handleLikeCard);

  cardLink.addEventListener('click', () => {
    popupImageBigItem.src = item.link;
    popupImageBigItem.alt = item.name;
    popupImageBigName.textContent = item.name;
    toggleClassPopup(popupImageBig);
  })

  return newCard;
}

const renderInitialCards = (item) => {
  cardListElement.prepend(createCard(item));
}

initialCards.forEach(function (item) {
  renderInitialCards(item);
})

//Функция отправки формы карточки
const handleFormSubmitAddCard = (e) => {
  e.preventDefault();
  renderInitialCards({
    name: formInputCardName.value,
    link: formInputCardLink.value,
  });
  e.target.reset();
  toggleClassPopup(popupCardAdd);
}

//Функция открытия-закрытия popup
const toggleClassPopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

//Закрытие попапов при клике по overlay
const closePopupByClickOnOverlay = (e) => {
  if (!e.target.closest('.popup__container')) {
    toggleClassPopup(e.target.closest('.popup'));
  }
}

//Функция для кнопки Сохранить popup profile
function submitEditProfileForm(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  toggleClassPopup(popupEditProfile);
}

// Функция закрытия попапов по нажатию на Esc
function closePopupOnEsc(evt) {
  if (evt.key === 'Escape') {
    toggleClassPopup(document.querySelector('.popup_opened'))
  }
}

//Слушатели
document.addEventListener('keydown', closePopupOnEsc);

popupOpenButtonElement.addEventListener('click', function () {
  toggleClassPopup(popupEditProfile);
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
});

popupCloseButtonElement.addEventListener('click', function () {
  toggleClassPopup(popupEditProfile);
})

popupCardAddOpenButtonElement.addEventListener('click', function () {
  const cardSubmitBtn = popupCardAdd.querySelector('#card-submit');
  cardSubmitBtn.setAttribute('disabled', true);
  cardSubmitBtn.classList.add('popup__button_disabled');
  toggleClassPopup(popupCardAdd);
})

popupCloseCardAdd.addEventListener('click', function () {
  toggleClassPopup(popupCardAdd);
})

popupCloseImageBig.addEventListener('click', function () {
  toggleClassPopup(popupImageBig);
})
formEditProfile.addEventListener('submit', submitEditProfileForm);

formAddCard.addEventListener('submit', handleFormSubmitAddCard);

popupEditProfile.addEventListener('click', closePopupByClickOnOverlay);
popupCardAdd.addEventListener('click', closePopupByClickOnOverlay);
popupImageBig.addEventListener('click', closePopupByClickOnOverlay);

