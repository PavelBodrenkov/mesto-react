import {useState, useEffect} from 'react';
import api from './../utils/Api.js'
import Card from './Card.js'


function Main (props) {
    const [userAvatar, setUserAvatar] = useState()
    const [userName, setUserName] = useState()
    const [userDescription, setUserDescription] = useState()
    const [cards, setCards] = useState([])

    

    useEffect(() => {
      Promise.all([api.getInitialProfile(), api.getInitialCards()])
       .then((respons) => {
          setUserAvatar(respons[0].avatar)
          setUserName(respons[0].name)
          setUserDescription(respons[0].about)
          setCards(respons[1])
        })
    }, [])

    return (
        <div className="conteiner">
        <main className="main">
          <section className="profile">
            <div onClick={props.onEditAvatar} className="profile__avatar-container">
              <img src={userAvatar} alt="Жак-Ив Кусто" className="profile__avatar" />
            </div>
            <div className="profile__info">
              <div className="profile__edit">
                <h1 className="profile__name">{userName}</h1>
                <button onClick={props.onEditProfile}  aria-label="Редактировать_профиль" className='button button_type_edit' type="button"></button>
              </div>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
            <button onClick={props.onAddPlace} aria-label="Добавить_фото" className="button button_type_add-card" type="button"></button>
          </section>
          <section className="elements">
            <div className="elements__content">
            {cards.map((item) => {
						return (<Card card={item} onCardClick={props.onCardClick} key={item._id} />)
					})}
            </div>
          </section>
        </main>
        </div>
    )
}

export default Main