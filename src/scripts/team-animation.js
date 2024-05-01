import {FlipAnimationObserver} from "./utils/FlipAnimationObserver.js";

(() => {
    'use strict';
    const animation = new FlipAnimationObserver();
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.app-about-team__person').forEach(el => animation.observe(el))
    })
})();