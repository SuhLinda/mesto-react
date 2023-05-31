import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";

function AddPlacePopup({isOpen, onClose, onUpdateCards}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [title, setTitle] = React.useState(currentUser.title);
  const [link, setLink] = React.useState(currentUser.link);

  React.useEffect(() => {
    setTitle(currentUser.title);
    setLink(currentUser.link);
  }, [currentUser]);

  function handleChangeTitle(evt) {
    setTitle(evt.target.value);
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onUpdateCards({
      name: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      name="popUpAddPlace"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}>
      <fieldset className="popup__fieldset">
        <input
          className="popup__fieldset-input"
          value={title}
          onChange={handleChangeTitle}
          type="text"
          minLength="2"
          maxLength="30"
          id="title-input"
          name="title"
          placeholder="Название"
          required/>
        <span className="title-input-error popup__fieldset-error">
            </span>
        <input
          className="popup__fieldset-input"
          value={link}
          onChange={handleChangeLink}
          type="url"
          id="image-input"
          name="image"
          placeholder="Ссылка на картинку"
          required/>
        <span className="image-input-error popup__fieldset-error">
            </span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;