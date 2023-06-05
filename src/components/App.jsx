import React from 'react';
import Header from './Header.jsx';
import Main from './Main.jsx';
import Footer from './Footer.jsx';
import ImagePopup from './ImagePopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import DeleteCardPopup from './DeleteCardPopup.jsx';
import { api } from '../utils/Api.js';
import { AppContext } from '../contexts/AppContext.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] =React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isDeleteCard, setDeleteCard] = React.useState({});
  const [toggleButtonState, setToggleButtonState] = React.useState(false);
  const [toggleOfTheInputText, setToggleOfTheInputText] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState({});

  React.useEffect(() => {
    Promise.all([
      api.getUserData(),
      api.getInitialCards()
    ])
      .then(([user, card]) => {
        setCurrentUser(user);
        setCards(card);
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`);
      })
  }, []);

  React.useEffect(() => {
    setToggleButtonState(true);
    setErrorMessage({});
    setToggleOfTheInputText(true);
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen]);

  function isValid(evt) {
    if(!evt.currentTarget.checkValidity) {
      setToggleButtonState(true);
      setToggleOfTheInputText(true);
      setErrorMessage({
        ...errorMessage, [evt.target.name]: evt.target.validationMessage
      })
    } else {
      setToggleButtonState(false);
      setToggleOfTheInputText(false);
      setErrorMessage({});
    }
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(selectedCard) {
    setSelectedCard(selectedCard);
  }

  function handleBasketCardClick(card) {
    setDeleteCardPopupOpen(true);
    setDeleteCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setDeleteCardPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item =>
      item._id === currentUser._id
    );

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((item) =>
            item._id === card._id ? newCard : item
          ));
      })
      .catch(console.error)
  }

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then(closeAllPopups)
      .catch(console.error)
      .finally(() => setIsLoading(false))
  }


  function handleCardDelete() {
    setIsLoading(true);

    function makeRequestCardDelete() {
      return api.deleteCard(isDeleteCard._id)
        .then(() => {
          setCards((state) =>
            state.filter((item) =>
              item._id !== isDeleteCard._id))
        })
    }
    handleSubmit(makeRequestCardDelete);
  }

  function handleUpdateUser(data) {
    function makeRequestUpdateUser() {
      return api.setUserData(data).then(setCurrentUser);
    }
    handleSubmit(makeRequestUpdateUser);
  }

  function handleUpdateUserAvatar(data) {
    function makeRequestUpdateUserAvatar() {
      return api.setUserAvatar(data).then(setCurrentUser);
    }
    handleSubmit(makeRequestUpdateUserAvatar);
  }

  function handleUpdateCards(data) {
    function makeRequestUpdateCards() {
      return api.addNewCard(data)
        .then((data) => {
          const newCard = data;
          setCards([newCard, ...cards]);
        })
    }
    handleSubmit(makeRequestUpdateCards)
  }

  return (
    <AppContext.Provider value={{ isLoading, closeAllPopups }}>
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardDelete={handleBasketCardClick}
            onCardLike={handleCardLike}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            onValidate={isValid}
            toggleButtonState={toggleButtonState}
            errorMessage={errorMessage}
            toggleOfTheInputText={toggleOfTheInputText} />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateUserAvatar={handleUpdateUserAvatar}
            isLoading={isLoading}
            onValidate={isValid}
            toggleButtonState={toggleButtonState}
            errorMessage={errorMessage}
            toggleOfTheInputText={toggleOfTheInputText} />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCards={handleUpdateCards}
            isLoading={isLoading}
            onValidate={isValid}
            toggleButtonState={toggleButtonState}
            errorMessage={errorMessage}
            toggleOfTheInputText={toggleOfTheInputText} />
          <DeleteCardPopup
            isOpen={isDeleteCardPopupOpen}
            onClose={closeAllPopups}
            onDeleteCard={handleCardDelete}
            isLoading={isLoading} />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}/>
        </div>
      </CurrentUserContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
