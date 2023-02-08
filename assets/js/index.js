// DOM Elements
let profileElement = document.getElementById("profile");
let usernameForm = document.getElementById("get-username");
let todoSectionElement = document.getElementById("todo-section");
let usernameElement = document.getElementById("username")
let dateElement = document.getElementById("date");
let addTodoForm = document.getElementById("add-to-form");
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

function addTodo(todo) {
    todos.push({
        name: todo,
        completed: false
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * Get username from local storage and display it to the DOM.
 * Get the value from getDate function and display it to the DOM
 */

function renderApp() {
    let username = JSON.parse(localStorage.getItem("username"));

    usernameElement.textContent = username;

    dateElement.textContent = getDate();
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