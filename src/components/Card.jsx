// Card.jsx

import React from "react";

function Card(props) {
  const card = props.card;

  function handleClick() {
    props.onCardClick(card)
  }

  return(
    <>
      <div className="element">
        <img
          id="element__image"
          className="element__image"
          onClick={handleClick}
          src={props.src}
          alt={props.title}/>
        <button
          className="element__delete"
          type="button"
          aria-label="удалить">
        </button>
        <h2 className="element__text">{props.name}
        </h2>
        <button
          className="element__stroke"
          type="button"
          aria-label="лайк">
        </button>
        <span className="element__likes-counter">{card.likes.length}
        </span>
      </div>
    </>
  )
}

export default Card;