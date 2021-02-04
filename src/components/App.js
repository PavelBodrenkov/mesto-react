import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagePopup from './ImagePopup.js'
import { useState } from 'react';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})



  function handleCardClick(card) {
    setIsPhotoPopupOpen(true)
    setSelectedCard(card)
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function closeAllPopup() {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsPhotoPopupOpen(false)
  }

  function escClose() {
    const close = (event) => {
      if (event.target.classList.contains('popup_opened')) {
        closeAllPopup()
      }
    }
    document.addEventListener('click', close)
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />

      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopup} closeOver={escClose}
        name="edit"
        title='Редактировать профиль'>
            <input id="text-input" className="popup__data popup__data_type_name" type="text" placeholder="Имя" name="name"
               minLength="2" maxLength="40" required />
            <span id="text-input-error" className="popup__data-error"></span>
            <input id="subtext-input" className="popup__data popup__data_type_job" type="text" placeholder="Вид деятельности"
              name="profession"  minLength="2" maxLength="200" required />
            <span id="subtext-input-error" className="popup__data-error"></span>
            <button className="button button_type_save button_type_save-edit" type="submit" name="button"
              value="Сохранить">Сохранить</button>
      </PopupWithForm>
      
      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopup} closeOver={escClose}
        name="avatar"
        title="Обновить аватар" >
            <input id="avatar-input" className="popup__data popup__data_photo" type="url" name="photoAvatar" 
              placeholder="Ссылка на картинку" required />
            <span id="avatar-input-error" className="popup__data-error"></span>
            <button className="button button_type_save button_type_save-profile" type="submit" name="button"
              value="Сохранить">Сохранить</button>
      </PopupWithForm>
      
      <PopupWithForm isOpen={isAddPlacePopupOpen} onClose={closeAllPopup} closeOver={escClose}
        name="photo"
        title="Новое место" >
            <input id="photo-input" className="popup__data popup__data_photo popup__data_type_location" type="text"
              name="point"  placeholder="Название" minLength="2" maxLength="30" required />
            <span id="photo-input-error" className="popup__data-error"></span>
            <input id="url-input" className="popup__data popup__data_photo popup__data_type_link" type="url" name="photo"
               placeholder="Ссылка на картинку" required />
            <span id="url-input-error" className="popup__data-error"></span>
            <button className="button button_type_save button_type_save-add" type="submit" name="button"
              value="Создать">Создать</button>
      </PopupWithForm> 
      
      
      <ImagePopup card={selectedCard} onClose={closeAllPopup} isOpen={isPhotoPopupOpen} closeOver={escClose} />
    </div >
  );
}

export default App;
