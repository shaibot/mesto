class Card {
  constructor (name, link) {
    this._name = name;

    this._link = link;
  }
//Задача метода _getTemplate — вернуть разметку карточки через return
  _getTemplate() {
    const newCard = document
    .querySelector('#card-template')
    .content
    .querySelector('.elements__item')
    .cloneNode(true);

  return newCard;
}

createCard () {
  this._element = this._getTemplate();

this._element.querySelector('.element__image').src = this._link;
this._element.querySelector('.element__caption').alt = this._name;
this._element.querySelector('.element__caption').textContent = this._name;


return this._element;
  }
}

// Чтобы опубликовать карточки. Обойдите массив items и для каждого его элемента:
// создайте экземпляр класса Card,
// подготовьте карточку к публикации и верните результат,
// опубликуйте карточку в elements__list DOM-дерева.

items.forEach((item) => {
  const card = new Card(item.name, item.link);
  const cardElement = card.createCard();

  // Добавляем в DOM
  document.querySelector('.elements__list').prepend(cardElement);
});
