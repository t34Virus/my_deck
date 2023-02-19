import logo from './logo.svg';
import { createElement } from 'react';
import './Card.css';
import { CardType } from '../../types/CardTypes';

function Card() {
  const deck = require('../../config/config.json')
  let cardElements: Array<HTMLElement>;

  function getAllCards() {
    let tempArray = [];
    for (const card in deck) {
      const cardImage = createElement('img', { src: deck[card].image_path });
      const cardDescription = createElement('p',{}, deck[card].description);
      const flipCardFront = createElement('div',
      { className: 'flip-card-front'}, cardImage)
      const flipCardBack = createElement('div',
      { className: 'flip-card-back'}, cardDescription)
      const flipCardInner = createElement('div',
      { className: 'flip-card-inner'}, [flipCardFront, flipCardBack])
      const flipCard = createElement('div',
      { className: 'cardBox flip-card'}, flipCardInner )
      tempArray.push(flipCard);
    }
    return tempArray;
  }

  function showCard() {
    const randoNumber = Math.floor(Math.random() * Object.keys(deck).length);

    const cardElements = Array.from(document.getElementsByClassName('flip-card'));

    cardElements.forEach(card => {
      if (card.classList.contains('show')) {
        card.classList.remove('show')
      }
    });
    cardElements[randoNumber].classList.add('show');
  }

  function spreadCards(spread: number) {
    if (!cardElements) {
      cardElements = Array.from(document.getElementsByClassName('cardBox') as HTMLCollectionOf<HTMLElement>);
    }

    const cardContainer = document.getElementById('cardContainer') as HTMLElement;
    if (cardContainer?.className) {
      cardContainer.className = '';
    }
    cardContainer.className = `spread${spread}`;

    const randoNumbers = randomUniqueNewYork(cardElements.length-1, spread);
    let cardPos = new Array()
    randoNumbers.forEach((number, index) => {
      const horizontalPos = ((index - (spread/2)) * 100) + 50;
      const verticalPos = (Math.abs((index - (spread/2.5)) * 100)/spread) + (25/spread)
      cardPos.push({horizontalPos, verticalPos})
      console.log(cardPos);
    })
  }

  function randomUniqueNewYork(range: number, outputCount: number) {
    let array: Array<number> = [];
    for (let i = 1; i <= range; i++) {
      array.push(i);
    }

    let result: Array<number> = [];
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(array[random]);
      array[random] = array[range-i]
    }
    return result;
  }
  return (
    <div className="App">
      <button id="rando" onClick={showCard}>Click me</button>
      <button id="spreadCard3" onClick={() => spreadCards(3)}>3 Card Spread</button>
      <button id="spreadCard5" onClick={() => spreadCards(5)}>5 Card Spread</button>
      <button id="spreadCard5" onClick={() => spreadCards(7)}>7 Card Spread</button>
      <div id="cardContainer">
        {
          getAllCards()
        }
      </div>
    </div>
  );
}

export default Card;
