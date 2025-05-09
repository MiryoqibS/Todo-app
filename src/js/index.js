"use strict";

import { arrays } from "./utils/arrays.js";
import { setDate } from "./utils/setDate.js";
import { loadCategoriesText } from "./utils/loadCategoriesText.js";
import { addTodo } from "./utils/addTodo.js";
import { loadTodos } from "./utils/loadTodos.js";
import { filterTodos } from "./utils/filterTodos.js";

const logArrays = () => {
    console.log(`This is logArrays() function`);

    console.log(arrays);
};

document.addEventListener("DOMContentLoaded", () => {
    logArrays();
    setDate();
    addTodo();
    loadTodos();
    loadCategoriesText();
    filterTodos();
})