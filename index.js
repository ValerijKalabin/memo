const initialNumberCardPairs = 6;
let backgroundColors = [];
let openCard = 0;
let stopClick = false;

const menu = document.querySelectorAll('.header__menu-item');
const btnNewGame = menu[0];
const buttonOpenPopupPairs = menu[1];
const btnStatistics = menu[2];

const cards = document.querySelector('.cards');
const templateCard = document.querySelector('#template-card').content;

const popupPairs = document.querySelector('.popup_type_pairs');
const popupPairsForm = popupPairs.querySelector('.popup__form');
const popupPairsInput = popupPairsForm.querySelector('.popup__input');
const buttonClosePopupPairs = popupPairsForm.querySelector('[type="button"]');

function createCards (numberCardPairs) {
    let colors = [];
    let i = 1;
    while (i <= numberCardPairs) {
        let newColor = `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
        if (!colors.some(color => color === newColor) && newColor !== 'rgb(51, 51, 51)' && newColor !== 'rgb(102, 102, 102)') {
            colors.push(newColor);
            colors.push(newColor);
            i++;
        }
    }
    colors = colors.sort(() => Math.random() - 0.5);
    colors.forEach(color => {
        const cloneCard = templateCard.cloneNode(true);
        cloneCard.querySelector('.card').style.backgroundColor = color;
        cards.append(cloneCard);
    });
}

function deleteCards () {
    backgroundColors = [];
    openCard = 0;
    const allCards = cards.querySelectorAll('.card');
    const numberAllCards = allCards.length;
    allCards.forEach((card) => {
        card.remove();
    });
    return numberAllCards / 2;
};

function togglePopup (popup) {
    popup.classList.toggle('popup_opened');
};

cards.addEventListener('click', (evt) => {
    if (stopClick || evt.target.classList.contains('cards')) {
        return;
    }
    const titleCard = evt.target;
    const card = titleCard.parentElement;

    titleCard.style.opacity = 0;
    if (!backgroundColors.some(backgroundColor => backgroundColor === card.style.backgroundColor)) {
        if (!openCard) {
            openCard = card;
        } else if (card.style.backgroundColor !== openCard.style.backgroundColor) {
            stopClick = true;
            setTimeout(() => {
                titleCard.style.opacity = 1;
                openCard.children[0].style.opacity = 1;
                openCard = 0;
                stopClick = false;
            }, 500);
        } else if (card !== openCard) {
            backgroundColors.push(card.style.backgroundColor);
            openCard = 0;
        }
    }
});

btnNewGame.addEventListener('click', () => {
    createCards(deleteCards());
});

buttonOpenPopupPairs.addEventListener('click', () => {
    togglePopup(popupPairs);
});
buttonClosePopupPairs.addEventListener('click', (evt) => {
    evt.preventDefault();
    togglePopup(popupPairs);
});
popupPairsForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    deleteCards();
    createCards(popupPairsInput.value);
    togglePopup(popupPairs);
    popupPairsForm.reset();
});

createCards(initialNumberCardPairs);

