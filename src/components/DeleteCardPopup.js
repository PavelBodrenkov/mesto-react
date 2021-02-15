import React from "react";
import PopupWithForm from "./PopupWithForm.js";
function DeleteCardPopup({ isOpen, onCardDelete, onClose, name, closeOver }) {
  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete();
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      form={handleSubmit}
      onClose={onClose}
      name={name}
      closeOver={closeOver}
    >
      <h2 className="popup__title popup__title_type_photo">Вы уверены ?</h2>
      <button
        className="button button_type_save"
        type="submit"
        name="button"
        value="yes"
      >
        Да
      </button>
    </PopupWithForm>
  );
}

export default DeleteCardPopup;