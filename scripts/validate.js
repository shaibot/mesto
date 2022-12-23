// const checkInputValidity = (input, config) => {
//   const error = document.querySelector(`#${input.id}-error`);

//   if (input.validity.valid) {
//     error.textContent = '';
//     error.classList.remove(config.errorClass);
//     input.classList.remove(config.inputErrorClass);
//   } else {
//     error.textContent = input.validationMessage;
//     error.classList.add(config.errorClass);
//     input.classList.add(config.inputErrorClass);

//   }
// }

const form = document.querySelector('.popup__form');
const formInput = form.querySelector('.popup__input');
const formError = form.querySelector(`#${formInput.id}-error`);

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${formInput.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__error_visible');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${formInput.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.textContent = '';
  errorElement.classList.remove('popup__error_visible');
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = [...formElement.querySelectorAll('.popup__input')];

  inputList.forEach((inputElement) => {
    inputElement.addEventLisener('input', function() {
      checkInputValidity(formElement, inputElement);
    });
  });
};

const enableValidation = () => {
  const formList = [...document.querySelectorAll('.popup__form')];

  //вот здесь с forEach передавались submit в тренажере
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

enableValidation();

//Не нужно пытаться объединить все в одну функцию, помните правило,
//каждая функция решает строго одну задачу. Важно научиться разбивать
// код на функции. Пока, можно посмотреть пример разбивки в вашем
//тренажере, со временем вы научитесь сами видеть такие моменты,
//это обязательно придет с опытом.
//Посмотрите  эту страницу тренажера

//Каждая функция должна выполнять строго одну задачу, в данном случае
// отображать ошибку поля ввода. Другая функция будет очищать поле
//ввода от ошибки. Обратитесь к вашему тренажеру, в разделе "Валидация
// форм" приведен полностью код валидатора, отличие от него только
//в том, что все классы и селекторы передаются в параметре начиная
//с функции enableValidation и дальше из одной функции в другую.
//Для чего это делается.
//Во-первых, это важно для групповой разработки. Когда в сопровождении приложения участвует несколько человек, чем больше функционала будет заложено в одну функцию, тем больше шансов коллизии при слиянии изменений от разных участников. Пока вы этого не касаетесь, но нужно сразу привыкать разбивать код на функции по принципу удобства дальнейшей работы с ним.
//Во-вторых, это дает возможность переиспользовать участки кода, чем вы сможете воспользоваться уже в следующем спринте. В противном случае придется дублировать код, что так-же негативно сказывается на дальнейшем его сопровождении.

// //Дизейбл кнопки
// const toggleDisableBtn = (inputs, button, config) => {
//   const formValid = inputs.every(input => input.validity.valid);

//   if (formValid) {
//     //раздизейблить
//     button.classList.remove(config.inactiveButtonClass);
//     button.disabled = false;
//   } else {
//     //задизейблить
//     button.classList.add(config.inactiveButtonClass);
//     button.disabled = true;
//   }
// }


// // включение валидации вызовом enableValidation
// // все настройки передаются при вызове

// const enableValidation = ({ formSelector, inputSelector, submitButtonSelector, ...restConfig }) => {

//   const forms = [...document.querySelectorAll(formSelector)];

//   forms.forEach(form => {
//     const inputs = [...form.querySelectorAll(inputSelector)];
//     const button = form.querySelector(submitButtonSelector);

//     form.addEventListener('submit', (e) => {
//       e.preventDefault();
//     })

//     inputs.forEach(input => {
//       input.addEventListener('input', () => {
//         //Показать ошибку
//         checkInputValidity(input, restConfig);
//         //Задизейблить кнопку
//         toggleDisableBtn(inputs, button, restConfig);
//       })
//     })
//   })
// }

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__button',
//   inactiveButtonClass: 'popup__button_disabled',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__error_visible'
// });







