
function ImagesPopup (props) {
    return (
      <div className={`popup popup_type_photo ${props.card && 'popup_opened'}`}>
        <figure className="popup__big">
          <button onClick={props.onClose} aria-label="Закрыть_попап" className="button button_type_close button_type_big-close" type="button"></button>
          <img className="popup__big-photo" alt="Фото" src={props.card} />
          <figcaption className="popup__big-title"></figcaption>
        </figure>
      </div>
    )
}

export default ImagesPopup