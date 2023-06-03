import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function AddPlacePopup({isOpen, onClose, onUpdateCards, isLoading, onValidate, errorMessage, toggleButtonState, toggleOfTheInputText}) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");
  const [nameDirty, setNameDirty] = React.useState(false);
  const [linkDirty, setLinkDirty] = React.useState(false);
  const [nameError, setNameError] = React.useState("Заполните это поле.");
  const [linkError, setLinkError] = React.useState("Заполните это поле.");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
    if(evt.target.value.length < 2 || evt.target.value.length > 30) {
      setNameError('Текст должен быть не короче 2 символов');
      if(!evt.target.value) {
        setNameError('Текст должен быть не короче 2 символов');
      }
    } else {
      setNameError("");
    }
  }

  function handleChangeLink(evt) {
    setLink(evt.target.value);

    let pattern = "https://.*";
    if(pattern) {
      setLinkError('Введите URL.');
    } else {
      setLinkError("");
    }
  }

  function handleAddPlaceSubmit(evt) {
    evt.preventDefault();

    onUpdateCards({
      name: name,
      link: link
    });
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'name':
        setNameDirty(true);
        break
      case 'link':
        setLinkDirty(true);
        break
    }
  }

  return (
    <PopupWithForm
      name="popUpAddPlace"
      title="Новое место"
      buttonText={isLoading? "Создание..." : "Создать"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleAddPlaceSubmit}
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
          id="title-input"
          name="name"
          placeholder="Название"
          required/>
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {nameDirty && nameError}
        </span>
        <input
          onBlur={evt => blurHandler(evt)}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={link || ""}
          onChange={evt => handleChangeLink(evt)}
          type="url"
          id="image-input"
          name="link"
          placeholder="Ссылка на картинку"
          required/>
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {linkDirty && linkError}
        </span>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;