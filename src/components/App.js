import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { InitialProfileContext } from "./../contexts/CurrentUserContext";
import { InitialCards } from "./../contexts/CardContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeleteCardPopup from "./DeleteCardPopup";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(false);
  const [delPopup, setDelPopup] = useState(false);
  const [cardToDelete, setCardToDelete] = useState({});

  useEffect(() => {
    Promise.all([api.getInitialProfile(), api.getInitialCards()])
      .then((res) => {
        setCurrentUser(res[0]);
        setCards(res[1]);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    if (!isLiked) {
      api
        .addLike(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((item) =>
            item._id === card._id ? newCard : item
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    } else {
      setLike(false);
      api
        .deleteLike(card._id, isLiked)
        .then((newCard) => {
          const newCards = cards.map((item) =>
            item._id === card._id ? newCard : item
          );
          setCards(newCards);
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }

  function hendleDeleteCard(card) {
    setCardToDelete(card);
    setDelPopup(true);
  }

  function handleCardDeleteSubmit() {
    api
      .deleteAddCard(cardToDelete._id)
      .then(() => {
        const delcard = cards.filter((item) => item._id !== cardToDelete._id);
        setCards(delcard);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {
        setCardToDelete({});
        closeAllPopup();
      });
  }

  function handleCardClick(card) {
    setIsPhotoPopupOpen(true);
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPhotoPopupOpen(false);
    setDelPopup(false);
  }

  function escClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      closeAllPopup();
    }
  }

  function handleUpdateUser({ name, about }) {
    setLoading(true);
    api
      .pathEditProfile({ name: name, about: about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setLoading(true);
    api
      .addAvatar({ avatar: avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoading(false));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setLoading(true);
    api
      .postAddCard({ name: name, link: link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="page">
      <InitialProfileContext.Provider value={currentUser}>
        <InitialCards.Provider value={cards}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={hendleDeleteCard}
            noLike={like}
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            closeOver={escClose}
            onUpdateUser={handleUpdateUser}
            loading={loading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            closeOver={escClose}
            name="avatar"
            title="Обновить аватар"
            onUpdateAvatar={handleUpdateAvatar}
            loading={loading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            closeOver={escClose}
            name="photo"
            title="Новое место"
            onAddPlace={handleAddPlaceSubmit}
            loading={loading}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopup}
            isOpen={isPhotoPopupOpen}
            closeOver={escClose}
          />
          <DeleteCardPopup
            isOpen={delPopup}
            name="delete"
            card={selectedCard}
            onCardDelete={handleCardDeleteSubmit}
            onClose={closeAllPopup}
            closeOver={escClose}
          />
        </InitialCards.Provider>
      </InitialProfileContext.Provider>
    </div>
  );
}

export default App;
