import React from "react";
import Card from "./Card.js";
import { InitialProfileContext } from "./../contexts/CurrentUserContext";
import { InitialCards } from "./../contexts/CardContext";
import DeleteCardPopup from './DeleteCardPopup'


function Main({onCardClick, onCardLike, onCardDelete, onEditProfile, onAddPlace, onEditAvatar, noLike, onPopupDel}) {
  const currentUser = React.useContext(InitialProfileContext);
  const cards = React.useContext(InitialCards);

  

  return (
    <div className="conteiner">
      <main className="main">
        <section className="profile">
          <div
            onClick={onEditAvatar}
            className="profile__avatar-container"
          >
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="profile__avatar"
            />
          </div>
          <div className="profile__info">
            <div className="profile__edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                aria-label="Редактировать_профиль"
                className="button button_type_edit"
                type="button"
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
          <button
            onClick={onAddPlace}
            aria-label="Добавить_фото"
            className="button button_type_add-card"
            type="button"
          ></button>
        </section>
        <section className="elements">
          <div className="elements__content">
            {cards.map((item) => {
             
              return (
                <Card
                  card={item}
                  onCardClick={onCardClick}
                  key={item._id}
                  onCardLike={onCardLike}
                  // onCardDelete={onCardDelete}
                  noLike={noLike}
                  onPopupDel={onPopupDel}
                />
                
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Main;