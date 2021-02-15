import { React, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({
  isOpen,
  onClose,
  closeOver,
  name,
  title,
  onAddPlace
}) {
  const nameCurrent = useRef();
  const linkCurrent = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameCurrent.current.value,
      link: linkCurrent.current.value
    });
    nameCurrent.current.value = "";
    linkCurrent.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      closeOver={closeOver}
      name={name}
      title={title}
      form={handleSubmit}
    >
      <input
        ref={nameCurrent}
        id="photo-input"
        className="popup__data popup__data_photo popup__data_type_location"
        type="text"
        name="point"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span id="photo-input-error" className="popup__data-error"></span>
      <input
        ref={linkCurrent}
        id="url-input"
        className="popup__data popup__data_photo popup__data_type_link"
        type="url"
        name="photo"
        placeholder="Ссылка на картинку"
        required
      />
      <span id="url-input-error" className="popup__data-error"></span>
      <button
        className="button button_type_save button_type_save-add"
        type="submit"
        name="button"
        value="Создать"
      >
        Создать
      </button>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
