"use strict";

// Months
const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

// Set date
const dateText = document.querySelector("#dateText");

const now = new Date();

dateText.innerText = `${now.getDate()} ${months[now.getMonth()]}`;

// Load todos
const todosList = document.querySelector("#todosList");

const loadTodos = () => {
    todos.forEach((todo) => {
        // Data
        const todoTitle = todo.title;
        const todoCategoryClass = `todo--${todo.category.toLowerCase()}`;
        const todoCategoryText = todo.category.charAt(0).toUpperCase() + todo.category.slice(1);

        // HTML element
        const todoElement = document.createElement("li");
        todoElement.classList.add("todo-app__item");
        todoElement.classList.add("todo");
        todoElement.classList.add(todoCategoryClass);
        todoElement.setAttribute("data-index", todo.id)

        if (todo.isChecked) todoElement.classList.add("checked");

        // Child element custom checkbox
        const checkbox = document.createElement("label");
        checkbox.className = "todo__checkbox";

        const checkboxInput = document.createElement("input");
        checkboxInput.type = "checkbox";
        checkboxInput.checked = todo.isChecked;
        checkboxInput.className = "todo__input";
        checkboxInput.id = "todoCheckbox";

        const SVG_NS = "http://www.w3.org/2000/svg";
        const XLINK_NS = "http://www.w3.org/1999/xlink";

        const checkboxIcon = document.createElementNS(SVG_NS, "svg");
        checkboxIcon.classList.add("todo__icon");
        checkboxIcon.setAttribute("width", "14");
        checkboxIcon.setAttribute("height", "10");

        const checkboxIconUse = document.createElementNS(SVG_NS, "use");
        checkboxIconUse.setAttributeNS(XLINK_NS, "xlink:href", "/public/icons/sprites.svg#icon-check");
        checkboxIconUse.setAttribute("href", "/public/icons/sprites.svg#icon-check");
        checkboxIcon.appendChild(checkboxIconUse);

        checkbox.append(checkboxInput, checkboxIcon);

        // Add event listener to Checkbox
        checkbox.addEventListener("click", () => {
            todoElement.classList.toggle("checked");
            const todoElementId = Number(todoElement.getAttribute("data-index")) - 1;
            todos[todoElementId].isChecked = !todos[todoElementId].isChecked;
            localStorage.setItem("todos", JSON.stringify(todos));
        });

        // Child element body text content
        const body = document.createElement("div");
        body.className = "todo__body";
        const bodyTitle = document.createElement("p");
        bodyTitle.className = "todo__title";
        bodyTitle.append(todoTitle);
        const bodyCategory = document.createElement("p");
        bodyCategory.classList.add("todo__category");
        bodyCategory.classList.add("category");
        bodyCategory.classList.add(`category--${todo.category}`);
        bodyCategory.append(todoCategoryText);

        body.appendChild(bodyTitle);
        body.appendChild(bodyCategory);

        // Child element actions
        const actions = document.createElement("div");
        actions.classList.add("todo__actions");
        actions.classList.add("grid");
        actions.classList.add("grid--2");

        const deleteTodoButton = document.createElement("button");
        deleteTodoButton.id = "deleteTodoButton";
        deleteTodoButton.classList.add("todo__action");
        deleteTodoButton.classList.add("button");

        deleteTodoButton.addEventListener("click", () => {
            const todoId = Number(deleteTodoButton.closest(".todo").getAttribute("data-index"));
            if (deleteTodoButton.closest(".todo--health")) {
                todosHealth.pop();
            } else if (deleteTodoButton.closest(".todo--work")) {
                todosWork.pop();
            } else if (deleteTodoButton.closest(".todo--mentality")) {
                todosMentality.pop();
            } else if (deleteTodoButton.closest(".todo--other")) {
                todosOther.pop();
            };

            let updatedTodos = JSON.parse(localStorage.getItem("todos")).filter(todo => todo.id !== todoId);
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            deleteTodoButton.closest("li").remove();
            loadCategoriesText();
        });

        const deleteTodoIcon = document.createElementNS(SVG_NS, "svg");
        deleteTodoIcon.classList.add("todo__action-icon");
        deleteTodoIcon.setAttribute("width", "15");
        deleteTodoIcon.setAttribute("height", "15");

        const deleteTodoIconUse = document.createElementNS(SVG_NS, "use");
        deleteTodoIconUse.setAttributeNS(XLINK_NS, "xlink:href", "/public/icons/sprites.svg#icon-trash");
        deleteTodoIconUse.setAttribute("href", "/public/icons/sprites.svg#icon-trash");
        deleteTodoIcon.appendChild(deleteTodoIconUse);

        deleteTodoButton.append(deleteTodoIcon);

        actions.append(deleteTodoButton)

        // Add child element to parent
        todoElement.append(checkbox, body, actions);

        // Sort todo into category
        switch (todo.category) {
            case "health":
                todosHealth.push(todo);
                break;
            case "work":
                todosWork.push(todo);
                break;
            case "mentality":
                todosMentality.push(todo);
                break;
            case "other":
                todosOther.push(todo);
                break;
        };

        // Append into list
        todosList.append(todoElement);
    });
};

// Load categories text
const loadCategoriesText = () => {
    const categoryHealthText = document.querySelector("#categoryHealthText");
    const categoryWorkText = document.querySelector("#categoryWorkText");
    const categoryMentalityText = document.querySelector("#categoryMentalityText");
    const categoryOtherText = document.querySelector("#categoryOtherText");

    categoryHealthText.innerHTML = `${todosHealth.length} <span>Health</span>`;
    categoryWorkText.innerHTML = `${todosWork.length} <span>Work</span>`;
    categoryMentalityText.innerHTML = `${todosMentality.length} <span>Mentality</span>`;
    categoryOtherText.innerHTML = `${todosOther.length} <span>Other</span>`;
}

document.addEventListener("DOMContentLoaded", () => {
    loadTodos();
    loadCategoriesText();
});