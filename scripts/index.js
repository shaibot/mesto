const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//находим попапы
const popupElement = document.querySelector('#popup-edit-profile');
const popupCardAdd = document.querySelector('#popup-card-add');
const popupImageBig = document.querySelector('#popup-image-big');

//контент внутри попапов
const formElement = popupElement.querySelector('.popup__content');
const nameInput = popupElement.querySelector('.popup__name');
const jobInput = popupElement.querySelector('.popup__occupation');
const profileName = document.querySelector('.profile__name');
const profileOccupation = document.querySelector('.profile__occupation');

//Кнопки открытия попапов
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCardAddOpenButtonElement = document.querySelector('.profile__button');
const popupImageBigOpenButton = document.querySelector('.element__image');

//Кнопки закрытия
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
const popupCloseCardAdd = popupCardAdd.querySelector('.popup__close');
const popupCloseImageBig = popupImageBig.querySelector('.popup__close');

//Добавление const для элементов card

const cardListElement = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content.querySelector('.elements__item');
const formCardElement = document.querySelector('#form-for-card');
const formInputCardName = document.querySelector('[name="card-name"');

// Функции карточек: удаление, добавление, лайк

const handleDeleteCard = (event) => {
  event.target.closest('.elements__item').remove();
  }

  const handleLikeCard = (event) =>{
    event.target.closest('.element__like').classList.toggle('element__like_active');
  }

const createCard = (item) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardName = newCard.querySelector('.element__caption');
  cardName.textContent = item.name;

  const deleteCardBtn = newCard.querySelector('.element__card-delete');
  deleteCardBtn.addEventListener('click', handleDeleteCard);

  const likeCardBtn = newCard.querySelector('.element__like');
  likeCardBtn.addEventListener('click', handleLikeCard);

  return newCard;
}

const renderCard = (item) => {
  cardListElement.prepend(createCard(item));
}

initialCards.forEach(function (item) {
  renderCard(item);
})


//Функция отправки формы карточки
const handleFormSubmitAddCard = (e) => {
  e.preventDefault();
  renderCard({name: input.value});
  input.value = '';
}



//Функция открытия-закрытия popup
const togglePopup = function (popup) {
  popup.classList.toggle('popup_opened');
}

//Функция для кнопки Сохранить popup profile
function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  togglePopup(popupElement);
}

  //Слушатели
  popupOpenButtonElement.addEventListener('click', function () {
    togglePopup(popupElement);
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
  });

  popupCloseButtonElement.addEventListener('click', function () {
    togglePopup(popupElement);
  })

  popupCardAddOpenButtonElement.addEventListener('click', function () {
    togglePopup(popupCardAdd);
  })

  popupCloseCardAdd.addEventListener('click', function () {
    togglePopup(popupCardAdd);
  })

  popupImageBigOpenButton.addEventListener('click', function () {
    togglePopup(popupImageBig);
  })

  popupCloseImageBig.addEventListener('click', function () {
    togglePopup(popupImageBig);
  })
  formElement.addEventListener('submit', formSubmitHandler);

  formCardElement.addEventListener('submit', handleFormSubmitAddCard);
// const closePopupByClickOnOverlay = function(event) {
//   if (event.target !== event.currentTarget) {
//     closePopup();
//   }
// };


// popupElement.addEventListener('click', closePopupByClickOnOverlay);



//Функция добавления на страницу карточки с template

