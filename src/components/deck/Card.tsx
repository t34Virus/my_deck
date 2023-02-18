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
      const cardFrontImage = createElement('img', { src: deck[card].image_path });
      const cardDescription = createElement('p',{}, deck[card].description);
      const flipCardFront = createElement('div',
      { className: 'flip-card-front'}, cardFrontImage)
      const flipCardBack = createElement('div',
      { className: 'flip-card-back'}, cardDescription)
      const flipCardInner = createElement('div',
      { className: 'flip-card-inner'}, [flipCardFront, flipCardBack])
      const flipCard = createElement('div',
      { className: 'cardBox flip-card' }, flipCardInner )
      tempArray.push(flipCard);
    }
    return tempArray;
  }

  function spreadCards(spread: number) {
    if (!cardElements) {
      cardElements = Array.from(document.getElementsByClassName('cardBox') as HTMLCollectionOf<HTMLElement>)
    }
    
    const cardContainer = document.getElementById('cardContainer')
    if (cardContainer?.className) {
      cardContainer.className = '';
    }
    cardContainer?.classList.add(`spread${spread}`);

    cardElements.forEach(card => {
      if (card.classList.contains('spread')) {
        card.classList.remove('spread')
        card.style.transform = `translate(0,0)`;
      }
    });

    const randoNumbers = randomUniqueNum(cardElements.length-1, spread);
    randoNumbers.forEach((card, index) => {
      const horizontal = (index-(spread/2)) * 100;
      const vertical = (Math.abs((index-(spread/2.5)) * 100)/spread) + 120;
      
      console.log(horizontal, vertical);

      cardElements[card].classList.add('spread')
      cardElements[card].style.transform = 
      `translate(${horizontal + 50}%, ${vertical}%)`;
    });
  }

  function randomUniqueNum(range: number, outputCount: number) {

    let arr = []
    for (let i = 1; i <= range; i++) {
      arr.push(i)
    }
  
    let result = [];
  
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
  
    return result;
  }

  function showCard() {
    const randoNumber = Math.floor(Math.random() * Object.keys(deck).length);

    const cardElements = Array.from(document.getElementsByClassName('cardBox'));

    cardElements.forEach(card => {
      if (card.classList.contains('show')) {
        card.classList.remove('show')
      }
    });
    cardElements[randoNumber].classList.add('show');
  }
  return (
    <div className="App">
      <button id="rando" onClick={showCard}>Click me</button>
      <button id="spread3" onClick={() => spreadCards(3)}>3</button>
      <button id="spread5" onClick={() => spreadCards(5)}>5</button>
      <button id="spread7" onClick={() => spreadCards(7)}>7</button>
      <div id="cardContainer">
        {
          getAllCards()
        }
      </div>
    </div>
  );
}

export default Card;
