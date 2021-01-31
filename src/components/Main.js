import Kusto from './../images/kusto.jpg'
import {useState, useEffect} from 'react';
import api from './../utils/Api.js'
import Card from './Card.js'
import ImagesPopup from './ImagesPopup.js'

function Main (props) {

    const [userAvatar, setUserAvatar] = useState()
    const [userName, setUserName] = useState()
    const [userDescription, setUserDescription] = useState()
    const [cards, setCards] = useState([])

    useEffect(() => {
      api.getInitialProfile()
        .then((respons) => {
            setUserAvatar(respons.avatar)
            setUserName(respons.name)
            setUserDescription(respons.about)
        })
        
    }, [])

    // useEffect(() => {
    //     api.getInitialProfile()
    //         .then((respons) => {
    //             setUserName(respons.name)
    //         })
    // }, [])

    // useEffect(() => {
    //     api.getInitialProfile()
    //         .then((respons) => {
    //             setUserDescription(respons.about)
    //         })
    // }, [])

    useEffect(() => {
        api.getInitialCards()
            .then((respons) => {
                const cards = respons.map((item) => {
                    return {
                        name: item.name,
                        link:item.link,
                        likes: item.likes,
                        _id: item._id
                    }
                })
                setCards(respons)

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
                {cards.map(item =><Card key={item._id} {...item} onCardClick={props.onCardClick}/>)}
                
            </div>
          </section>
        </main>
        </div>
    )
}

export default Main