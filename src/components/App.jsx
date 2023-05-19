import React from 'react'
import Header from './Header.jsx'
import Main from './Main.jsx'
import Footer from './Footer.jsx'
import PopupWithForm from './PopupWithForm.jsx'
import ImagePopup from './ImagePopup.jsx'

function App() {
  const [isEditProfilePopUpOpen, setEditProfilePopUpOpen] = React.useState(false)
  const [isEditAvatarPopUpOpen, setEditAvatarPopUpOpen] = React.useState(false)
  const [isAddPlacePopUpOpen, setAddPlacePopUpOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({})


  function handleEditProfileClick() {
    setEditProfilePopUpOpen(true)
  }

  function handleEditAvatarClick() {
    setEditAvatarPopUpOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopUpOpen(true)
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard)
  }

  function closeAllPopUps() {
    setEditProfilePopUpOpen(false)
    setEditAvatarPopUpOpen(false)
    setAddPlacePopUpOpen(false)
    setSelectedCard(false)
  }

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        />
      <Footer />
      <PopupWithForm
        name="popUpEditProfile"
        title="Редактировать профиль"
        buttonText="Сохранить"
        isOpen={isEditProfilePopUpOpen}
        onClose={closeAllPopUps}>
          <fieldset className="popup__fieldset">
            <input
              className="popup__fieldset-input"
              type="text"
              minLength="2"
              maxLength="40"
              id="name-input"
              name="name"
              placeholder="Имя"
              required
            />
            <span className="name-input-error popup__fieldset-error">
            </span>
            <input
              className="popup__fieldset-input"
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
      <PopupWithForm
        name="popUpAvatarProfile"
        title="Обновить аватар"
        buttonText="Сохранить"
        isOpen={isEditAvatarPopUpOpen}
        onClose={closeAllPopUps}>
        <fieldset className="popup__fieldset">
          <span className="avatar-input-error popup__fieldset-error">
          </span>
          <input
            className="popup__fieldset-input"
            type="url"
            id="avatar-input"
            name="avatar"
            placeholder="Ссылка на картинку"
            required/>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        name="popUpAddPlace"
        title="Новое место"
        buttonText="Создать"
        isOpen={isAddPlacePopUpOpen}
        onClose={closeAllPopUps}>
        <fieldset className="popup__fieldset">
          <input
            className="popup__fieldset-input"
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
            type="url"
            id="image-input"
            name="image"
            placeholder="Ссылка на картинку"
            required/>
          <span className="image-input-error popup__fieldset-error">
          </span>
        </fieldset>
      </PopupWithForm>
      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopUps}/>
    </div>
  );
}

export default App;
