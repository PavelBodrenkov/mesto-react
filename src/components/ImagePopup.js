import React from 'react';
import { Esc } from '../utils/constants.js'
import { useEffect } from "react"

function ImagePopup(props) {

  useEffect(() => {
    if (!props.isOpen) return;
    const closeESC = (evt) => {
      if (evt.keyCode === Esc) {
        props.onClose()
      }
    }
    document.addEventListener('keydown', closeESC)

    return () => {
      document.removeEventListener('keydown', closeESC)
    };

  }, [props.isOpen, props.onClose]
  );

  return (
    <div className={`popup popup_type_photo ${props.isOpen && 'popup_opened'}`} onClick={props.closeOver}>
      <figure className="popup__big">
        <button onClick={props.onClose} aria-label="Закрыть_попап" className="button button_type_close button_type_big-close" type="button"></button>
        <img className="popup__big-photo" alt="Фото" src={`${props.card.link}`} />
        <figcaption className="popup__big-title"></figcaption>
      </figure>
    </div>

  )
}

export default ImagePopup