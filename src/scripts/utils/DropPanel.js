export class DropPanel {
    MAX_FILES_LENGTH = 4;
    PANEL_INIT_STYLE = "init";
    ATTACH_ITEM_STYLE = "attach-item";
    ATTACH_ITEM_DELETE_ICON_STYLE = "attach-item__delete-icon";

    constructor(config) {
        if (!config.droppableElementSelector || !config.uploadButtonSelector || !config.attachmentsSelector) {
            throw new Error("DropPanel: should provide droppableElementSelector, uploadButtonSelector, attachmentsSelector")
        }

        this.droppable = document.querySelector(config.droppableElementSelector);
        this.attachments = this.droppable.querySelector(config.attachmentsSelector);
        this.uploader = this.droppable.querySelector(config.uploadButtonSelector);

        this.files = new Map();

        this.init();
    }

    isReadyToUse() {
        return (this.droppable instanceof HTMLElement && this.attachments instanceof HTMLElement && this.uploader instanceof HTMLInputElement);
    }


    dropHandler(ev) {
        ev.preventDefault();

        if (ev.target.files) {
            [...ev.target.files].forEach((file, i) => {
                this.addFile(file);
            });
        } else if (ev.dataTransfer.items) {
            [...ev.dataTransfer.items].forEach((item, i) => {
                if (item.kind === "file") {
                    this.addFile(item.getAsFile());
                }
            });
        } else {
            [...ev.dataTransfer.files].forEach((file, i) => {
                this.addFile(file);
            });
        }
    }

    createAttachment(file) {
        const attach = document.createElement('div');
        const attachText = document.createElement('span');
        const attachDeleteIcon = document.createElement('span');
        attach.classList.add(this.ATTACH_ITEM_STYLE);
        attachDeleteIcon.classList.add(this.ATTACH_ITEM_DELETE_ICON_STYLE);
        attach.appendChild(attachText);
        attach.appendChild(attachDeleteIcon);
        attachText.innerText = file.name;

        this.attachments.appendChild(attach);

        attachDeleteIcon.addEventListener('click', () => {
            this.deleteFile(file);
            attach.parentElement.removeChild(attach);
        })
    }

    addFile(file) {
        const validation = this.isValid(file);
        if (validation.valid) {
            this.files.set(file.name, file)
            this.createAttachment(file);
            console.log(file.name, file, this.files)
        } else {
            console.error(validation.reason);
        }
    }

    deleteFile(file) {
        this.files.delete(file.name);
    }

    isValid(file) {
        const v1 = this.isValidFileType(file);
        const v2 = this.isValidFileSize(file);
        const v3 = this.isValidMaxLength();

        return {
            valid: v1.valid && v2.valid && v3.valid,
            reason: !v1.valid && v1.reason || !v2.valid && v2.reason || !v3.valid && v3.reason
        }
    }

    isValidFileType(file) {
        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf", "application/msword"];
        return {
            valid: allowedTypes.includes(file.type),
            reason: `File type "${file.type}" is not allowed`
        };
    }

    isValidFileSize(file) {
        const maxSize = 5 * 1024 * 1024;
        return {
            valid: file.size <= maxSize,
            reason: `File size should be less then 5mb`
        };
    }

    isValidMaxLength() {
        return {
            valid: this.files.size < this.MAX_FILES_LENGTH,
            reason: `Max files length 4`
        };
    }


    init() {
        if (!this.isReadyToUse()) {
            throw new Error("SliderPanel: elements to init not found")
        }

        Object.assign(this.droppable, {
            getFiles: () => {
                return this.files
            }
        })

        this.droppable.setAttribute("droppable", true);

        this.droppable.addEventListener('dragenter', (e) => { e.stopPropagation(); this.droppable.classList.add('dragover')});
        this.droppable.addEventListener('dragleave', (e) => { e.stopPropagation(); this.droppable.classList.remove('dragover')});
        this.droppable.addEventListener('drop', (e) => this.dropHandler(e));
        this.uploader.addEventListener('change', (e) => this.dropHandler(e));

    }
}