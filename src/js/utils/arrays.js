"use strict";

export const arrays = {
    // Todos array 
    todos: JSON.parse(localStorage.getItem("todos") || "[]"),

    // Todos categories array
    todosHealth: [],
    todosWork: [],
    todosMentality: [],
    todosOther: [],
}