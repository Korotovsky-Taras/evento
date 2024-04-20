export class SliderPanel {
    PANEL_INIT_STYLE = "init";
    ROOT_EXPANDED_STYLE = "sidebar-expanded";
    PANEL_EXPANDED_STYLE = "expanded";

    constructor(config) {
        if (!config.buttonElement || !config.sidebarElement) {
            throw new Error("SliderPanel: should provide buttonElement, sidebarElement")
        }

        this.button = config.buttonElement;
        this.panel = config.sidebarElement;

        this.disableScroll = config.disableScroll || false;

        this.init();
    }

    isReadyToUse() {
        return (this.button instanceof HTMLElement && this.panel instanceof HTMLElement);
    }

    isMobile() {
        return 'matchMedia' in window && matchMedia("(max-width: 1024px)").matches;
    }

    init() {
        if (!this.isReadyToUse()) {
            throw new Error("SliderPanel: elements to init not found")
        }

        setTimeout(() => {
            this.panel.classList.add(this.PANEL_INIT_STYLE)
        }, 0);

        this.button.addEventListener("click", () => this.toggleExpand());

        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.button.contains(e.target) && this.panel.classList.contains(this.PANEL_EXPANDED_STYLE)) {
                this.toggleExpand();
            }
        });


        let timeout;
        window.addEventListener('resize', (e) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                if (this.isMobile()) {
                    return;
                }
                this.expand(false);
            }, 50);
        });
    }

    toggleExpand() {
        const expand = !this.panel.classList.contains(this.PANEL_EXPANDED_STYLE);
        this.expand(expand);
    }

    expand(expand) {
        this.panel.classList.toggle(this.PANEL_EXPANDED_STYLE, expand);
        this.button.classList.toggle("active", expand);
        document.documentElement.classList.toggle(this.ROOT_EXPANDED_STYLE, expand);
    }
}