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
import DeleteCardPopup from "./DeleteCardPopup"

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [like, setLike] = useState(false)
  const [delPopup, setDelPopup] = useState(false)

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
  
  function handleCardLike  (card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id)
    if (!isLiked) {
      api.addLike(card._id, !isLiked)
        .then((newCard) => {
          const newCards = cards.map((item) => item._id === card._id ? newCard : item)
          // document.querySelector('.button_type_like').classList.add('button_type_like_active')
          setCards(newCards);
        });
    } else {
      setLike(false)
      api.deleteLike(card._id, isLiked)
        .then((newCard) => {
          console.log(newCard)
          const newCards = cards.map((item) => item._id === card._id ? newCard : item)
          setCards(newCards);

        })
    }
  }

  function handleCardDelete (card) {
    console.log(card._id)
    
    api.deleteAddCard(card._id)
        .then((newCard) => {
          console.log(newCard)
          const delcard = cards.filter((item) => item._id !== card._id)
          console.log(delcard)
          setCards(delcard)
        })
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
  }

  function escClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      closeAllPopup();
    }
  }

  function handleUpdateUser(props) {
    console.log(props);

    api.pathEditProfile({ name: props.name, about: props.about })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
      .finally(() => {});
  }

  function handleUpdateAvatar(props) {
    api.addAvatar({ avatar: props.avatar })
      .then((res) => {
        setCurrentUser(res);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleAddPlaceSubmit(props) {
    api.postAddCard({ name: props.name, link: props.link })
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopup();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleDeleteCardClick () {
    setDelPopup(true)
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
            // onCardDelete={handleCardDelete}
            noLike={like}
            onPopupDel={handleDeleteCardClick}
            
          />
          <Footer />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopup}
            closeOver={escClose}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopup}
            closeOver={escClose}
            name="avatar"
            title="Обновить аватар"
            onUpdateAvatar={handleUpdateAvatar}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopup}
            closeOver={escClose}
            name="photo"
            title="Новое место"
            onAddPlace={handleAddPlaceSubmit}
          />

           <ImagePopup
            card={selectedCard}
            onClose={closeAllPopup}
            isOpen={isPhotoPopupOpen}
            closeOver={escClose}
          />

          <DeleteCardPopup  isOpen={delPopup} name="delete" card={cards}  onCardDelete={handleCardDelete}/>

        </InitialCards.Provider>
      </InitialProfileContext.Provider>
    </div>
  );
}

export default App;
