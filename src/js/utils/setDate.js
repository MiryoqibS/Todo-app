"use strict";

export const setDate = () => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    const dateText = document.querySelector("#dateText");
    const now = new Date();

    if (dateText) {
        dateText.innerText = `${now.getDate()} ${months[now.getMonth()]}`;
    }

}