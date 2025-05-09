"use strict";

import { arrays } from "./arrays.js";

// Load categories text
export const loadCategoriesText = () => {
    const categoryHealthText = document.querySelector("#categoryHealthText");
    const categoryWorkText = document.querySelector("#categoryWorkText");
    const categoryMentalityText = document.querySelector("#categoryMentalityText");
    const categoryOtherText = document.querySelector("#categoryOtherText");


    if (categoryHealthText) {        
        console.log(`changed ${arrays.todosHealth.length}`);
        categoryHealthText.innerHTML = `${arrays.todosHealth.length} <span>Health</span>`;
    }

    if (categoryWorkText) {
        console.log(`changed ${arrays.todosWork.length}`);
        categoryWorkText.innerHTML = `${arrays.todosWork.length} <span>Work</span>`;
    }

    if (categoryMentalityText) {
        console.log(`changed ${arrays.todosMentality.length}`);
        categoryMentalityText.innerHTML = `${arrays.todosMentality.length} <span>Mentality</span>`;        
    }

    if (categoryOtherText) {
        console.log(`changed ${arrays.todosOther.length}`);
        categoryOtherText.innerHTML = `${arrays.todosOther.length} <span>Other</span>`;
    }
};