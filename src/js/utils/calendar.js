const date = new Date();
const today = date.getDate();
const firstDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() - today + 1).getDate();
const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

import { arrays } from "./arrays.js";

// HTML elements
const calendarCarousel = document.querySelector("#calendarCarousel");
const calendarEvents = document.querySelector("#calendarEvents");

// Set left to today day
let calendarCarouselLeft = -60 * today;

if (calendarCarousel) {
    calendarCarousel.style.left = `${calendarCarouselLeft}px`;
};

// Carousel
if (calendarCarousel) {
    calendarCarousel.addEventListener("wheel", (event) => {
        // To Right
        if (event.deltaY > 0 && calendarCarouselLeft > -1760) {
            calendarCarouselLeft -= 40;
        };

        // To Left
        if (event.deltaY < 0 && calendarCarouselLeft < 0) {
            calendarCarouselLeft += 40;
        };

        calendarCarousel.style.left = `${calendarCarouselLeft}px`;
    });
};

// Create calendar event item
const createCalendarEvent = (event) => {
    // Time data
    const {
        startHour,
        startMinute,
        endHour,
        endMinute,
    } = event.time

    // Todo data
    const {
        category,
        title
    } = event;

    // Parent element
    const calendarEvent = document.createElement("article");
    calendarEvent.classList.add("calendar__event");

    // Event time
    const calendarEventTime = document.createElement("p");
    calendarEventTime.className = "calendar__event-time";
    calendarEventTime.innerText = `${startHour}:${startMinute}`;

    // Event body
    const calendarEventBody = document.createElement("div");
    calendarEventBody.className = "calendar__event-body";
    calendarEventBody.classList.add("category");
    calendarEventBody.classList.add(`category--${category}`);

    // Event circle
    const calendarEventCircle = document.createElement("span");
    calendarEventCircle.className = "calendar__event-circle";
    calendarEventCircle.style.backgroundColor = `var(--color-${category})`;

    // Event title
    const calendarEventTitle = document.createElement("p");
    calendarEventTitle.className = "calendar__event-title";
    calendarEventTitle.innerText = title;

    // Event duration
    const calendarEventDuration = document.createElement("p");
    calendarEventDuration.className = "calendar__event-duration";

    const startMinutes = parseInt(startHour) * 60 + parseInt(startMinute);
    const endMinutes = parseInt(endHour) * 60 + parseInt(endMinute);
    const duration = Math.floor((endMinutes - startMinutes) / 60);

    calendarEventDuration.innerText = `${duration}h`;

    calendarEventBody.append(calendarEventCircle, calendarEventTitle, calendarEventDuration);
    calendarEvent.append(calendarEventTime, calendarEventBody);

    return calendarEvent;
};

const loadCalendarEvents = () => {
    arrays.todos.forEach((event) => {
        calendarEvents.append(createCalendarEvent(event));
    });
};

// Create calendar day for carousel
const createCalendarDay = (weekday, date) => {
    // Parent element
    const dayElem = document.createElement("article");
    dayElem.classList.add("calendar__day");

    if (date === today) {
        dayElem.classList.add("active");
    };

    // Weekday element
    const weekdayElem = document.createElement("p");
    weekdayElem.className = "calendar__day-weekday";
    weekdayElem.innerText = weekdays[weekday];

    // Date element
    const dateElem = document.createElement("p");
    dateElem.className = "calendar__day-date";
    dateElem.innerText = date;

    dayElem.append(weekdayElem, dateElem);
    return dayElem;
};

// Init calendar
export const initCalendar = () => {
    loadCalendarEvents();

    for (let i = firstDay; i <= lastDay; i++) {
        let tmpDate = new Date(date.getFullYear(), date.getMonth(), i);

        if (calendarCarousel) {
            calendarCarousel.append(
                createCalendarDay(tmpDate.getDay(), tmpDate.getDate())
            );
        };
    };
};
