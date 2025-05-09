"use strict";

import { arrays } from "./arrays.js";
import { loadTodos } from "./loadTodos.js";

export const filterTodos = () => {
    const categories = [
        { bntSelector: "#categoryHealth", category: "health" },
        { bntSelector: "#categoryWork", category: "work" },
        { bntSelector: "#categoryMentality", category: "mentality" },
        { bntSelector: "#categoryOther", category: "other" },
    ]

    categories.forEach(({bntSelector, category}) => {
        const categoryButton = document.querySelector(bntSelector);
        if (!categoryButton) return;

        categoryButton.addEventListener("click", () => {
            if (category) {
                const filtered = arrays.todos.filter(todo => todo.category === category);
                loadTodos(filtered);
            } else {
                loadTodos();
            }
        });
    });
};