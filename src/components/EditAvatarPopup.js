import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({
  isOpen,
  onClose,
  closeOver,
  name,
  title,
  onUpdateAvatar,
  loading
}) {
  const inputEl = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputEl.current.value
    });
  }

  useEffect(() => {
    if (!isOpen) {
      inputEl.current.value = ""
    }
  }, [isOpen])

  const styles = {
    buttonDisabled: {
      background: 'grey',
      cursor: 'default'
    },
    buttonNotDisabled: {
      background: 'black',
      cursor: 'pointer'
    }
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      closeOver={closeOver}
      name={name}
      title={title}
      handleSubmit={handleSubmit}
    >
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
        disabled={loading ? true : false}
        style={loading ? styles.buttonDisabled : styles.buttonNotDisabled}
      >
        {loading ? "Сохранение..." : "Сохранить"}
      </button>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
