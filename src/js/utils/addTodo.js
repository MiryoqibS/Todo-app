"use strict";

import { arrays } from "./arrays.js";

export const addTodo = () => {
    // Select category
    const categories = document.querySelectorAll("#categorySelect");
    let todoCategory;

    const disableCategories = () => {
        categories.forEach((category) => {
            category.classList.add("disable");
        });
    };

    categories.forEach((category) => {
        category.addEventListener("click", () => {

            disableCategories();
            category.classList.toggle("disable");
            // Get todo category
            todoCategory = String(category.innerText).toLocaleLowerCase();

        });
    });

    // Select title placeholder
    const todoTitleInput = document.querySelector("#todoTitleInput");

    const addTodoButton = document.querySelector("#addTodoButton");

    addTodoButton.addEventListener("click", () => {
        console.log("Clicked addTodo");  // Если выводится дважды — точно два слушателя
        // Get todo title
        const todoTitle = String(todoTitleInput.value);

        if (todoTitle.length < 0) {
            return alert("Напишите заголовок!");
        }

        if (!todoCategory) {
            return alert("Выберите категорию!");
        }

        arrays.todos.push({
            id: arrays.todos.length + 1,
            title: todoTitle,
            category: todoCategory,
            isChecked: false,
        });

        localStorage.setItem("todos", JSON.stringify(arrays.todos));

        // Clear
        todoTitleInput.value = "";
        disableCategories();
    });
}

