import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup({isOpen, onClose, onUpdateUserAvatar, isLoading, onValidate, errorMessage, toggleButtonState, toggleOfTheInputText}) {
  const refAvatar = React.useRef();
  const [avatar, setAvatar] = React.useState("");
  const [avatarDirty, setAvatarDirty] = React.useState(false);
  const [avatarError, setAvatarError] = React.useState("Заполните это поле.");

  function handleChangeAvatar(evt) {
    setAvatar(evt.target.value);

    let pattern = "https://.*";
    if(pattern) {
      setAvatarError('Введите URL.');
    } else {
      setAvatarError("");
    }
  }

  const blurHandler = (evt) => {
    switch (evt.target.name) {
      case 'avatar':
        setAvatarDirty(true);
        break
    }
  }

  function handleSubmitUserAvatar(evt) {
    evt.preventDefault();

    onUpdateUserAvatar({
      avatar: refAvatar.current.value
    });
  }

  return (
    <PopupWithForm
      name="popUpAvatarProfile"
      title="Обновить аватар"
      buttonText={isLoading? "Сохранение..." : "Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitUserAvatar}
      onValidate={onValidate}
      toggleButtonState={toggleButtonState}
      errorMessage={errorMessage}
      toggleOfTheInputText={toggleOfTheInputText}>
      <fieldset className="popup__fieldset">
        <span className={`name-input-error popup__fieldset-error ${errorMessage && 'popup__fieldset-error_active'}`}>
          {avatarDirty && avatarError}
        </span>
        <input
          onBlur={evt => blurHandler(evt)}
          className={`popup__fieldset-input ${toggleOfTheInputText && 'popup__fieldset-input_inactive'} ${toggleOfTheInputText && 'popup__fieldset-input_type_error '}`}
          value={avatar || ""}
          onChange={evt => handleChangeAvatar(evt)}
          ref={refAvatar}
          type="url"
          id="avatar-input"
          name="avatar"
          placeholder="Ссылка на картинку"
          required/>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
