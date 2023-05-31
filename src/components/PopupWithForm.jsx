// PopupWithForm.jsx

import React from 'react';

function PopupWithForm({name, title, children, buttonText, isOpen, onClose, onSubmit}) {
  return (
    <div
      className={`popup popup_${name} ${isOpen ? 'popup_opened' : " "}`}>
        <div className="popup__container">
          <button
            className="popup__button-close"
            id={`popup__button-close_${name}`}
            type="button"
            aria-label="закрыть"
            onClick={onClose}>
          </button>
          <h2 className="popup__edit">{title}
          </h2>
          <form
            className="popup__form"
            name={name}
            id="popup__form_edit"
            noValidate
            onSubmit={onSubmit}>{children}
            <button
              className="popup__button-save"
              type="submit"
              id={name}
              aria-label="#">
              {buttonText}
            </button>
          </form>
        </div>
    </div>
  )
}

export default PopupWithForm;