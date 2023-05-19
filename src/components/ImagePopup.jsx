// ImagePopup.jsx
/////////
import React from 'react';

function ImagePopup(props) {
  return (
    <div
      className={`popup popup-zoom ${props.card.link ? 'popup_opened' : " "}`}
      id="popup-zoom">
        <div className="popup-zoom__container">
          <button
            className="popup-zoom__close popup__button-close"
            onClick={props.onClose}
            id="popup-zoom__close"
            type="button"
            aria-label="закрыть">
          </button>
          <img
            className="popup-zoom__image"
            id="popup-zoom__image"
            src={props.card ? props.card.link : " "}
            alt={props.card.name}/>
          <h2
            className="popup-zoom__subtitle"
            id="popup-zoom__subtitle">{props.card.name}
          </h2>
        </div>
    </div>
  )
}

export default ImagePopup;