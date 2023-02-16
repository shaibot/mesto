// export const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
//   },
// ]

export const popupEditAvatarSelector = '#popup-avatar-edit'
export const profileAvatar = document.querySelector('.profile__avatar')
export const popupEditAvatar = document.querySelector(popupEditAvatarSelector)
export const popupFormEditAvatar = popupEditAvatar.querySelector(
  '#form-for-edit-avatar',
)

export const popupEditProfile = document.querySelector('#popup-edit-profile')
export const popupCardAdd = document.querySelector('#popup-card-add')
export const popupOpenButtonElement = document.querySelector(
  '.profile__edit-button',
)
export const popupCardAddOpenButtonElement =
  document.querySelector('.profile__button')
export const popupInputLinkAvatar =
  popupEditAvatar.querySelector('.popup__input_link')
export const editAvatarBtn = document.querySelector('.profile__edit-avatar-btn')

export const popupImageSelector = '#popup-image-big'
export const cardListContainer = '.elements__list'
export const cardTemplateSelector = '#card-template'
export const cardAddForm = popupCardAdd.querySelector('.popup__form')
export const profileEditForm = popupEditProfile.querySelector('.popup__form')

export const nameInput = profileEditForm.querySelector('.popup__input_name')
export const occupationInput = profileEditForm.querySelector(
  '.popup__input_occupation',
)
export const validationConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
}

export const profileSelector = {
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__occupation',
}

export const profileName = document.querySelector(profileSelector.userNameSelector)
export const profileOccupation = document.querySelector(
  profileSelector.userInfoSelector
)
