import { useEffect } from "react"
import { Esc } from './../utils/constants.js'

function PopupWithForm(props) {

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
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`} onClick={props.closeOver}>
      <div className="popup__conteiner">
        <form action="#" id="form_reset" className={`form form_type_${props.name_form}`} name={`popup-${props.name}`} novalidate>
          <h2 className='popup__title'>{props.title}</h2>
          {props.children}
        </form>
        <button onClick={props.onClose} aria-label="Закрыть_попап" className="button button_type_close" type="button"></button>
      </div>
    </div>

  )
}

export default PopupWithForm 