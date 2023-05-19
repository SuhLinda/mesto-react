// Main.jsx
//////////////
import React from "react";
import Card from "./Card.jsx"
import { api } from "../utils/Api.js";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
  const [userName, setUserName] = React.useState(" ")
  const [userDescription, setUserDescription] = React.useState(" ")
  const [userAvatar, setUserAvatar] = React.useState(" ")
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserData()
      .then((response) => {
        setUserName(response.name)
        setUserDescription(response.about)
        setUserAvatar(response.avatar)
      })
      .catch((err) => {
        console.log(`ошибка: ${err}`)
      })
    }, [])

  React.useEffect(() => {
    api.getInitialCards()
      .then((response) => {
        setCards(response);
      })
    }, [])

  return (
    <main className="content">
      <section className="profile">
        <img
          className="profile__image"
          src={userAvatar}
          alt="Жак-Ив Кусто"/>
        <button
          className="profile__image-button"
          type="button"
          onClick={onEditAvatar}>
        </button>
        <div className="profile__info">
          <h1 className="profile__info-title">{userName}
          </h1>
          <button
            className="profile__info-edit"
            id="popup__edit"
            type="button"
            aria-label="редактировать профиль"
            onClick={onEditProfile}>
            </button>
            <p className="profile__info-subtitle">{userDescription}
            </p>
        </div>
        <button
          className="profile__add-button"
          id="popup__card"
          type="button"
          aria-label="добавить"
          onClick={onAddPlace}>
        </button>
      </section>
      <section
        className="elements"
        aria-label="фото">
          {cards.map((card) => (
            <Card
              onCardClick={onCardClick}
              card={card}
              key={card._id}
              src={card.link}
              name={card.name}/>
          ))}
      </section>
    </main>
  );
}

export default Main;