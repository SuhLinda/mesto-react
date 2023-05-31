import React from "react";
import PopupWithForm from "./PopupWithForm.jsx";

function EditAvatarPopup({isOpen, onClose, onUpdateUserAvatar}) {
  const refAvatar = React.useRef();

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
      buttonText="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitUserAvatar}>
      <fieldset className="popup__fieldset">
        <span className="avatar-input-error popup__fieldset-error">
        </span>
        <input
          className="popup__fieldset-input"
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
