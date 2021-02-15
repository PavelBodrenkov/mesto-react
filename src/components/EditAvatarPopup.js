import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";
// import { InitialProfileContext } from "./../contexts/CurrentUserContext";

function EditAvatarPopup({
  isOpen,
  onClose,
  closeOver,
  name,
  title,
  onUpdateAvatar
}) {
  
  const inputEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputEl.current.value
    });
    inputEl.current.value = "";
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} closeOver={closeOver} name={name} title={title} form={handleSubmit} >
      <input
        ref={inputEl}
        id="avatar-input"
        className="popup__data popup__data_photo"
        type="url"
        name="photoAvatar"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="avatar-input-error" className="popup__data-error"></span>
      <button
        className="button button_type_save button_type_save-profile"
        type="submit"
        name="button"
        value="Сохранить"
      >
        Сохранить
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
