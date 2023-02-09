/**
 * DOM Variables
 */
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
 * Check if the username is already in local storage.
 * If local storage has a username, the todo section will display. 
 * If it doesn't profile section will.
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
 * Pushes todo object to todos arrays and saves
 * it to local storage
 */

function addTodo(todo) {
    todos.push({
        name: todo,
        completed: false
    });

    setToLocalstorage();
}

/**
 * Get username from local storage and display it to the DOM.
 * Get the value from getDate function and display it to the DOM
 */

function renderApp() {
    let username = JSON.parse(localStorage.getItem("username"));

    usernameElement.textContent = username;

    dateElement.textContent = getDate();

    todosLeftElement.textContent = todosleft();

    renderTodos();
}

/**
 * Loop through the todos array, and render the todos to the DOM.
 */

function renderTodos() {
    todoListElement.innerHTML = "";
    todos.forEach(function (todo) {
        todoListElement.appendChild(createTodoItems(todo));
    })
}

/**
 * Save todos array to local storage and render the app
 * to display changes.
 */

function setToLocalstorage() {
    localStorage.setItem("todos", JSON.stringify(todos));

    renderApp();
}

/**
 * Generate HTML for todo item and return the value
 */

function createTodoItems(todo) {
    let liElement = document.createElement("li");

    liElement.classList.add("todo-item");

    liElement.innerHTML = `
    <input class="todo-checkbox" type="checkbox" aria-label="Complete todo" checked/>
    <span class="todo-name">${todo.name}</span>
    <i class="fa-solid fa-minus todo-delete"></i>`;

    liElement.children[0].addEventListener("click", function () {
        completeTodo(todo);
    })

    if (todo.completed === true) {
        liElement.children[0].checked = true;

        liElement.children[1].classList.add("todo-name-checked");
    } else {
        liElement.children[0].checked = false;
    }

    liElement.children[2].addEventListener("click", function () {
        removeTodo(todo);
    })

    return liElement;
}

/**
 * Find the index of the todo and remove it from the todos array
 */

function removeTodo(todo) {
    let todoIndex = todos.findIndex(function (value) {
        if (todo === value) {
            return todo
        }
    })

    todos.splice(todoIndex, 1);

    setToLocalstorage()
}

/**
 * Clear all todos values and save the changes to local storage
 */

function clearAllTodos() {
    todos = [];

    setToLocalstorage()
}

/**
 * Find how many todos are not completed and return value
 */

function todosleft() {
    return todos.filter(function (todo) {
        return todo.completed === false;
    }).length;
}

/**
 * Check off completed todo and save it to local storage
 */

function completeTodo(todo) {
    todo.completed = todo.completed === true ? false : true;

    setToLocalstorage()
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

/**
 * Get todo value from form and pass the value
 */

addTodoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const todo = this.todo.value.trim();

    this.todo.value = "";

    addTodo(todo);
})

clearAllElement.addEventListener("click", clearAllTodos)

renderApp()