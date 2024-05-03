
(() => {
    'use strict';


    const personsImages = [
        'Ashley_Clarkin.jpg',
        'Blake_McKinney.jpg',
        'Courtney_Nixa.jpg',
        'Danielle_Hennelly.jpg',
        'Dave_Stone.jpg',
        'Emma_Vernon.jpg',
        'Jane_Mower.jpg',
        'Karla_Gonzalez_Kuehler.jpg',
        'Kayla_Thuston.jpg',
        'Kelly_Rader.jpg',
        'Kristen_Mueller.jpg',
        'Kyle_Blonde.jpg',
        'Mary_Knobbe.jpg',
        'NateHHollensteiner.jpg',
        'Patrick_Corley.jpg',
        'Sara_Cope.jpg',
        'Sarah_Cymber.jpg',
        'Shelby_Heifner.jpg',
    ];

    const productsImages = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
        '6.jpg',
        '7.jpg',
        '8.jpg',
        '9.jpg',
        '10.jpg',
        '11.jpg',
        '12.jpg',
        '13.jpg',
        '14.jpg'
    ];

    const getProductImagePath = (img) => `./products/${img}`;
    const getPersonImagePath = (img) => `./persons/${img}`;
    const getImageName = (url) => url.split('/').pop();


    let lastShowedIndexes = [];
    let showedImages = new Set();

    const clearAnimation = () => {
        lastShowedIndexes = [];
        showedImages = new Set();
    }

    const runAnimation = () => {
        const grid = document.querySelector('.app-about-experts__grid');

        if ('matchMedia' in window) {
            grid.querySelectorAll('.app-about-experts__grid-cell').forEach((cell, i) => {
                cell.classList.remove('hidden');
                if ( i > 5 && matchMedia("(max-width: 543px)").matches
                    || i > 8 && matchMedia("(max-width: 767px)").matches
                    || i > 11 && matchMedia("(max-width: 1023px)").matches) {
                    cell.classList.add('hidden')
                }
            })
        }

        const gridImages = Array.from(grid.querySelectorAll('.app-about-experts__grid-cell:not(.hidden) img'));

        grid.querySelectorAll('img').forEach((img, i) => {
            showedImages.add(getImageName(img.src));
        })

        const reanimate = (imageIndex) => {

            const notShowedPersons = personsImages.filter(i => {
                return !showedImages.has(getImageName(i));
            });

            const notShowedProducts = productsImages.filter(i => {
                return !showedImages.has(getImageName(i));
            });

            const cI = imageIndex ?? Math.floor(gridImages.length  * Math.random());
            const rI = Math.floor(notShowedPersons.length  * Math.random());
            const rrI = Math.floor(notShowedProducts.length  * Math.random());

            if (lastShowedIndexes.includes(cI)) {
                reanimate();
                return;
            }

            const currentImageName = getImageName(gridImages[cI].src);
            const nextImagePath = personsImages.includes(currentImageName) ? getProductImagePath(notShowedProducts[rrI]) : getPersonImagePath(notShowedPersons[rI]);

            const img = document.createElement('img');
            const parent = gridImages[cI].parentElement;

            parent.append(img);

            img.onload = () => {
                const lastImage = gridImages[cI];
                gridImages[cI] = img;

                if ('animate' in img) {
                    const animation = img.animate([{ opacity: 0 }, { opacity: 1 }], {
                        duration: 500,
                        iterations: 1,
                        fill: 'forwards',
                        easing: 'ease-out',
                        iterationComposite: 'accumulate'
                    });
                    animation.onfinish = () => {
                        setTimeout(() => {
                            parent.removeChild(lastImage);
                        })
                    }
                } else {
                    parent.removeChild(lastImage);
                }
            }

            img.src = './' + nextImagePath


            showedImages.delete(currentImageName);
            showedImages.add(getImageName(nextImagePath));

            lastShowedIndexes.unshift(cI);
            lastShowedIndexes = lastShowedIndexes.slice(0,4);
        }

        return setInterval(reanimate, 1_000);
    }


    document.addEventListener('DOMContentLoaded', () => {

        let timeout;
        let animationId = runAnimation();

        window.addEventListener('resize', (e) => {
            clearTimeout(timeout);
            clearInterval(animationId);
            timeout = setTimeout(() => {
                clearAnimation();
                animationId = runAnimation();
            }, 50);
        });

    })
})();