export class FlipAnimationObserver {
    constructor() {
        this.observer = new IntersectionObserver(this.applyStyles, { threshold: 0 });
    }

    observe(el) {
        const isElement = el instanceof HTMLElement;
        if (!isElement) {
            throw Error('FlipAnimationObserver: initial error')
        }
        el.classList.add('a-hidden');
        this.observer.observe(el);
    }

    applyStyles(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('a-visible', 'animated', 'flipInY');
            }
        });
    }

}