import {DropPanel} from "./utils/DropPanel.js";

function init() {
    new DropPanel({
        droppableElementSelector: ".js-droppable-element",
        attachmentsSelector: ".js-drop-attachments-element",
        uploadButtonSelector: ".js-uploader-element",
    })
}

document.addEventListener("DOMContentLoaded", init);
