//массив карточек todo
const todoList = [
    {title: "Сделать проектную работу",
},
{
    title: "Полить цветы",
},
{title: "Пройти туториал по Реакту",},

];

//Дом узлы
const todoContainer = document.querySelector(".todo__list");
const form = document.querySelector(".form");
const input = document.querySelector(".form__input");

//Шаблоны

const cardTemplate = document.querySelector('#todo-template').content.querySelector('.todo-card');


//Генерация карточки

const handleDeleteCard = (event) => {
event.target.closest('.todo-card').remove();
}

const handleCheckCard = (event) => {
    event.target.closest('.todo-card').classList.toggle('todo-card_checked');
}

const generateCard = (dataCard) => {
    const newCard = cardTemplate.cloneNode(true);

    const title = newCard.querySelector('.todo-card__title');
    title.textContent = dataCard.title;

    const deleteBtn = newCard.querySelector('.todo-card__button_type_delete');
    deleteBtn.addEventListener('click', handleDeleteCard);
    
    const checkBtn = newCard.querySelector('.todo-card__button_type_check');
    deleteBtn.addEventListener('click', handleCheckCard);

    return newCard;
}

//Обработчики событий

const handleSubmitAddTodoForm = (event) => {
    event.preventDefault();
    renderCard({title: input.value});
    input.value = '';

};

//Добавление карточки

const renderCard = (dataCard) => {
    todoContainer.prepend(generateCard(dataCard));
}

//Рендер всех карточек. Рендер - это отрисовка

form.addEventListener("submit", handleSubmitAddTodoForm);

todoList.forEach((dataCard) => {
renderCard(dataCard);
}
)
