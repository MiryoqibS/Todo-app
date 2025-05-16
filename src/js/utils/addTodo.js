"use strict";

import { arrays } from "./arrays.js";

// Select title placeholder
const todoTitleInput = document.querySelector("#todoTitleInput");

// Buttons
const setTimeButton = document.querySelector("#setTimeButton");
const saveTimeboxButton = document.querySelector("#saveTimeboxButton");
const timeboxCloseButton = document.querySelector("#timeboxCloseButton");
// Hours
const hoursSelectStart = document.querySelector("#timeboxHoursStart");
const hoursSelectEnd = document.querySelector("#timeboxHoursEnd");
// Minutes
const minutesSelectStart = document.querySelector("#timeboxMinutesStart");
const minutesSelectEnd = document.querySelector("#timeboxMinutesEnd");
// Modal
const timeboxModal = document.querySelector("#timeboxModal");
// Reminder
const timeboxReminder = document.querySelector("#timeboxReminder");
// Settings
const todoTimeSettings = {};
let isTimeSet = false;

// Save todo button
const addTodoButton = document.querySelector("#addTodoButton");

// Select category
const categories = document.querySelectorAll("#categorySelect");

export const addTodo = () => {
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

    // Fill hours
    for (let i = 1; i <= 24; i++) {
        const optionStart = document.createElement("option");
        optionStart.innerText = String(i).padStart(2, "0");
        const optionEnd = optionStart.cloneNode(true);

        if (timeboxModal) {
            hoursSelectStart.append(optionStart);
            hoursSelectEnd.append(optionEnd);
        };
    };

    // Fill minutes
    for (let i = 0; i <= 60; i++) {
        const optionStart = document.createElement("option");
        optionStart.innerText = String(i).padStart(2, "0");
        const optionEnd = optionStart.cloneNode(true);

        if (timeboxModal) {
            if (i % 5 == 0) {
                minutesSelectStart.append(optionStart);
                minutesSelectEnd.append(optionEnd);
            };
        };
    };

    if (setTimeButton) {
        // Open modal
        setTimeButton.addEventListener("click", () => {
            timeboxModal.style.top = "0";
        });

        // Close modal
        timeboxCloseButton.addEventListener("click", () => {
            timeboxModal.style.top = "100%";
        });
    };

    if (saveTimeboxButton) {
        saveTimeboxButton.addEventListener("click", () => {
            if (!hoursSelectStart) return alert("Настройте часы, пожалуйста!");
            if (!hoursSelectEnd) return alert("Настройте часы, пожалуйста!");
            if (!minutesSelectStart) return alert("Настройте минуты, пожалуйста!");
            if (!minutesSelectEnd) return alert("Настройте минуты, пожалуйста!");

            if (
                Number(hoursSelectStart.value) > Number(hoursSelectEnd.value) ||
                (
                    Number(hoursSelectStart.value) === Number(hoursSelectEnd.value) &&
                    Number(minutesSelectStart.value) >= Number(minutesSelectEnd.value)
                )
            ) {
                return alert("Настройте правильное время, пожалуйста!")
            };

            isTimeSet = true;

            todoTimeSettings.startHour = hoursSelectStart.value;
            todoTimeSettings.startMinute = minutesSelectStart.value;
            todoTimeSettings.endHour = hoursSelectEnd.value;
            todoTimeSettings.endMinute = minutesSelectEnd.value;
            todoTimeSettings.reminder = timeboxReminder.isChecked;


            console.log(isTimeSet);
        });
    }

    if (addTodoButton) {
        addTodoButton.addEventListener("click", () => {
            // Get todo title
            const todoTitle = String(todoTitleInput.value);

            if (todoTitle.length < 0) return alert("Напишите заголовок!");

            if (!todoCategory) return alert("Выберите категорию!");

            console.log(isTimeSet);
            if (!isTimeSet) return alert("Настройте правильное время пожалуйста!");

            arrays.todos.push({
                id: arrays.todos.length + 1,
                title: todoTitle,
                category: todoCategory,
                isChecked: false,
                time: todoTimeSettings,
            });

            localStorage.setItem("todos", JSON.stringify(arrays.todos));

            // Clear
            todoTitleInput.value = "";
            disableCategories();
        });
    };
};