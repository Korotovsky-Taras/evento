(() => {
    'use strict';


    const {gsap, ScrollTrigger} = window;

    if (!gsap) {
        return
    }

    if (ScrollTrigger) {
        ScrollTrigger.normalizeScroll(true);
    }


    document.addEventListener("DOMContentLoaded", function () {
        gsap.to(".app-banner-back", {
            yPercent: 50,
            ease: "none",
            scrollTrigger: {
                trigger: ".app-banner",
                start: "top", // the default values
                // end: "bottom top",
                scrub: true
            },
        });
        gsap.to(".app-banner__content", {
            scale: 0.8,
            yPercent: 150,
            ease: "none",
            scrollTrigger: {
                trigger: ".app-banner",
                start: "top",
                end: "bottom",
                scrub: true
            },
        });
        gsap.to(".app-banner__left-img", {
            yPercent: 90,
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
                trigger: ".app-banner",
                start: "top",
                end: "bottom",
                scrub: true
            },
        });
        gsap.to(".app-banner__right-img", {
            xPercent: 20,
            yPercent: 120,
            ease: "none",
            scrollTrigger: {
                trigger: ".app-banner",
                start: "top",
                end: "bottom",
                scrub: true
            },
        });

    });

})();