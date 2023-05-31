import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmitUserInfo(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popUpEditProfile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitUserInfo}>
      <fieldset className="popup__fieldset">
        <input
          className="popup__fieldset-input"
          value={name}
          onChange={handleChangeName}
          type="text"
          minLength="2"
          maxLength="40"
          id="name-input"
          name="name"
          placeholder="Имя"
          required/>
        <span className="name-input-error popup__fieldset-error">
        </span>
        <input
          className="popup__fieldset-input"
          value={description}
          onChange={handleChangeDescription}
          type="text"
          minLength="2"
          maxLength="200"
          id="description-input"
          name="about"
          placeholder="О себе"
          required/>
        <span className="description-input-error popup__fieldset-error">
        </span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;