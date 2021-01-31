
function PopupWithForm (props) {

    return (
    /*<!--Попап профиля-->*/
      <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_opened'}`}>
      <div className="popup__conteiner">
        <form action="#" id="form_reset" className={`form form_type_${props.name_form}`} name={`popup-${props.name}`} novalidate>
          <h2 className='popup__title'>{props.title}</h2>
          {/* <button className="button button_type_save button_type_save-edit" type="submit" name="button"
            value="Сохранить">{props.children}</button> */}
            {props.children}
        </form>
        <button onClick ={props.onClose} aria-label="Закрыть_попап" className="button button_type_close" type="button"></button>
      </div>
    </div>
    
    )
}

export default PopupWithForm 