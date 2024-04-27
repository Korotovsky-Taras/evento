import {DropPanel} from "./utils/DropPanel.js";

function init() {
    const droppableElement = document.querySelector(".js-droppable-element");

    if (!droppableElement) {
        return;
    }

    new DropPanel({
        droppableElement
    })
}

document.addEventListener("DOMContentLoaded", init);
