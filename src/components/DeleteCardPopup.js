import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
// import { InitialCards } from "./../contexts/CardContext";
function DeleteCardPopup ({isOpen, card,  onCardDelete}) {
    // const cards = React.useContext(InitialCards);
    // console.log(cards)

    function handleSubmit (e) {
        e.preventDefault()
        onCardDelete(card)
    }

    return (
        <PopupWithForm isOpen={isOpen} form={handleSubmit}>
            <h2 class="popup__title popup__title_type_photo">Вы уверены ?</h2>
            <button class="button button_type_save" type="submit" name="button" value="yes">Да</button>
        </PopupWithForm>
    )
}

export default DeleteCardPopup