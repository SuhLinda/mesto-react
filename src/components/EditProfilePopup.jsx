import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser, isLoading, onValidate, errorMessage, toggleButtonState, toggleOfTheInputText}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState(currentUser.name);
  const [description, setDescription] = React.useState(currentUser.about);
  const [nameDirty, setNameDirty] = React.useState(false);
  const [descriptionDirty, setDescriptionDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState("Заполните это поле.");
  const [descriptionError, setDescriptionError] = React.useState("Заполните это поле.");

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
    if(evt.target.value.length < 2 || evt.target.value.length > 200) {
      setNameError('Текст должен быть не короче 2 символов');
      if(!evt.target.value) {
        setNameError('Текст должен быть не короче 2 символов');
      }
    } else {
      setNameError("");
    }
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
    if(evt.target.value.length < 2 || evt.target.value.length > 40) {
      setDescriptionError('Текст должен быть не короче 2 символов');
      if(!evt.target.value) {
        setDescriptionError('Текст должен быть не короче 2 символов');
      }
    } else {
      setDescriptionError("");
    }
  }

  function handleSubmitUserInfo(evt) {
    evt.preventDefault();

    onUpdateUser({
      name: name,
      about: description,
    });
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true);
        break
      case 'about':
        setDescriptionDirty(true);
        break
    }
  }

  return (
    <PopupWithForm
      name="popUpEditProfile"
      title="Редактировать профиль"
      buttonText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitUserInfo}
      onValidate={onValidate}
      toggleButtonState={toggleButtonState}
      errorMessage={errorMessage}
      toggleOfTheInputText={toggleOfTheInputText}>
      <fieldset className="popup__fieldset">
        <input
          onBlur={evt => blurHandler(evt)}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={name || ""}
          onChange={evt => handleChangeName(evt)}
          type="text"
          id="name-input"
          name="name"
          placeholder="Имя"
          required/>
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {nameDirty && nameError}
        </span>
        <input
          onBlur={evt => blurHandler(evt)}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={description || ""}
          onChange={evt => handleChangeDescription(evt)}
          type="text"
          id="description-input"
          name="about"
          placeholder="О себе"
          required/>
        <span className={`description-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {descriptionDirty && descriptionError}
        </span>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;