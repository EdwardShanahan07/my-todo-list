// DOM Elements
let profileElement = document.getElementById("profile");
let usernameForm = document.getElementById("get-username");
let todoSectionElement = document.getElementById("todo-section");
let usernameElement = document.getElementById("username")
let dateElement = document.getElementById("date");
let addTodoForm = document.getElementById("add-to-form");
let todoListElement = document.getElementById("todo-list");
let todosLeftElement = document.getElementById("todo-left");
let clearAllElement = document.getElementById("clear-all");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

/**
 * Checks if username exists in localstorage.
 * if username is in localstorage, profile won't display 
 * and todo section will display
 */

window.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("username")) {
        profileElement.classList.add("hide");

        todoSectionElement.classList.remove("hide");
    } else {
        todoSectionElement.classList.add("hide");
    }
})

/**
 * Get username and save it to localstorage
 */

usernameForm.addEventListener("submit", function (event) {
    event.preventDefault();

    let username = this.username.value.trim();

    localStorage.setItem("username", JSON.stringify(username));

    profileElement.classList.add("hide");

    todoSectionElement.classList.remove("hide")

    renderApp()
});

// Get todo value from form

addTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const todo = this.todo.value.trim();

    this.todo.value = "";

    addTodo(todo);

})

clearAllElement.addEventListener("click", clearAllTodos)

function addTodo(todo) {
    todos.push({
        name: todo,
        completed: false
    });

    localStorage.setItem("todos", JSON.stringify(todos));

    renderApp()
}



/**
 * Get username from local storage and display it to the DOM.
 * Get the value from getDate function and display it to the DOM
 */

function renderApp() {
    let username = JSON.parse(localStorage.getItem("username"));

    usernameElement.textContent = username;

    dateElement.textContent = getDate();

    renderTodos();
}

function renderTodos() {
    todoListElement.innerHTML = "";
    todos.forEach(function (todo) {
        todoListElement.appendChild(createTodoItems(todo));
    })
}

function createTodoItems(todo) {
    let liElement = document.createElement("li");

    liElement.classList.add("todo-item");

    liElement.innerHTML = `
    <input class="todo-checkbox" type="checkbox" aria-label="Complete todo" />
    <span class="todo-name">${todo.name}</span>
    <i class="fa-solid fa-minus todo-delete"></i>`;

    liElement.children[2].addEventListener("click", function () {
        removeTodo(todo);
    })

    return liElement;
}

function removeTodo(todo) {
    let todoIndex = todos.findIndex(function (value) {
        if (todo === value) {
            return todo
        }
    })

    todos.splice(todoIndex, 1);

    localStorage.setItem("todos", JSON.stringify(todos));

    renderApp();
}

function clearAllTodos() {
    todos = [];

    localStorage.setItem("todos", JSON.stringify(todos));

    renderApp();
}

/**
 * Get current date and return value
 */

function getDate() {
    const date = new Date();
    const options = {
        weekday: "short",
        month: "short",
        day: "numeric",
    };

    let currentDate = date.toLocaleDateString("en-US", options);

    return currentDate;
}

renderApp()

// Fixed Bug Getting first index of the array
// Duplicated Todos
// Deleteing to many todos using splice