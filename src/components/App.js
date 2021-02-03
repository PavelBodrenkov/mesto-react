import Header from './../components/Header.js';
import Main from './../components/Main.js';
import Footer from './../components/Footer.js'
import PopupWithForm from './PopupWithForm.js'
import ImagesPopup from './ImagesPopup.js'
import {useState} from 'react';


function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isPhotoPopupOpen, setIsPhotoPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})


  function handleCardClick (card) {
    setIsPhotoPopupOpen(!isPhotoPopupOpen)
    setSelectedCard(card)
  }


  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen)
  }

  function closeAllPopup () {
    setIsEditProfilePopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsPhotoPopupOpen(false)
  }

  return (
    <div className="page">
      <Header />
      <Main onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
      />
      <Footer  />

      <PopupWithForm  isOpen ={isEditProfilePopupOpen} onClose={closeAllPopup}
      name="edit"
      title='Редактировать профиль'
      children ={
        <>
             <input id="text-input" className="popup__data popup__data_type_name" type="text" placeholder="Имя" name="name"
              value="" minlength="2" maxlength="40" required />
            <span id="text-input-error" className="popup__data-error"></span>
            <input id="subtext-input" className="popup__data popup__data_type_job" type="text" placeholder="Вид деятельности"
              name="profession" value="" minlength="2" maxlength="200" required />
            <span id="subtext-input-error" className="popup__data-error"></span>
            <button className="button button_type_save button_type_save-edit" type="submit" name="button"
              value="Сохранить">Сохранить</button>
        </>
      }
      />
      <PopupWithForm  isOpen ={isEditAvatarPopupOpen} onClose={closeAllPopup}
      name="avatar"
      title="Обновить аватар"
      children={
        <>
              <input id="avatar-input" class="popup__data popup__data_photo" type="url" name="photoAvatar" value=""
              placeholder="Ссылка на картинку" required />
            <span id="avatar-input-error" class="popup__data-error"></span>
            <button class="button button_type_save button_type_save-profile" type="submit" name="button"
              value="Сохранить">Сохранить</button>
        </>
      }
      />
      <PopupWithForm  isOpen ={isAddPlacePopupOpen} onClose={closeAllPopup}
      name="photo"
      title="Новое место"
      children={
        <>
            <input id="photo-input" className="popup__data popup__data_photo popup__data_type_location" type="text"
              name="point" value="" placeholder="Название" minlength="2" maxlength="30" required />
            <span id="photo-input-error" className="popup__data-error"></span>
            <input id="url-input" className="popup__data popup__data_photo popup__data_type_link" type="url" name="photo"
              value="" placeholder="Ссылка на картинку" required />
            <span id="url-input-error" className="popup__data-error"></span>
            <button className="button button_type_save button_type_save-add" type="submit" name="button"
              value="Создать">Создать</button>
        </>
      }
      />
     
      <ImagesPopup  card={selectedCard} onClose={closeAllPopup} isOpen={isPhotoPopupOpen} />
    </div >
  );
}

export default App;
