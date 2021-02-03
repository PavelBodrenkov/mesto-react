
function Card (props) {

    function handleClick () {
        props.onCardClick(props.card)
       
    }
    
    return (
       <article className="element">
          <button aria-label="Удалить" class="button button_type_delete" type="button"></button>
          <button onClick={handleClick} className="button button_type_photo"><img  className="element__photo" alt="Фото" src={props.card.link} /></button>
          <div className="element__position">
            <h3 className="element__subtitle">{props.card.name}</h3>
            <div>
              <button aria-label="Поставить_лайк" className="button button_type_like" type="button"></button>
              <div className="element__counter_like">{props.card.likes.length}</div>
            </div>
          </div>
        </article>
    )
}

export default Card