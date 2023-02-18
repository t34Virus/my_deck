import logo from './logo.svg';
import { createElement } from 'react';
import './Card.css';
import { CardType } from '../../types/CardTypes';

function Card() {
  const deck = require('../../config/config.json')

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
  return (
    <div className="App">
      <button id="rando" onClick={showCard}>Click me</button>
      <div id="cardContainer">
        {
          getAllCards()
        }
      </div>
    </div>
  );
}

export default Card;
