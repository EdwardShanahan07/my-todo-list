// DOM Elements
let profileElement = document.getElementById("profile");
let usernameForm = document.getElementById("get-username");
let todoSectionElement = document.getElementById("todo-section");
let dateElement = document.getElementById("date");
let addTodoForm = document.getElementById("add-to-form");
let todosLeftElement = document.getElementById("todo-left");
let clearAllElement = document.getElementById("clear-all");

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