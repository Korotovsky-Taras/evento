import {SliderPanel} from "./utils/SliderPanel.js";

function init() {
    new SliderPanel({
        sidebarElement: document.querySelector(".js-sidebar-element"),
        buttonElement:  document.querySelector(".js-sidebar-btn-element"),
    })
}

document.addEventListener("DOMContentLoaded", init);
