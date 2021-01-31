
function Card (props) {

    function handleClick () {
        props.onCardClick(props.link, props.name, props.likes)
        console.log('Привет')
    }
    
    return (
    <article className="element">
          <button aria-label="Удалить" class="button button_type_delete" type="button"></button>
          <button onClick={handleClick} className="button button_type_photo"><img className="element__photo" alt="Фото" src={props.link} /></button>
          <div className="element__position">
            <h3 className="element__subtitle">{props.name}</h3>
            <div>
              <button aria-label="Поставить_лайк" className="button button_type_like" type="button"></button>
              <div className="element__counter_like">{props.likes.length}</div>
            </div>
          </div>
        </article>
    )
}

export default Card