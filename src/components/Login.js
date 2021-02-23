import React from 'react'
import {Link} from 'react-router-dom'



function Login () {


    return(
      <div className="login">
      <div className="login__container">
        <form action="#" id="form_reset" className="login__form" name noValidate>
          <h2 className="popup__title ligin__title">Регистрация</h2>
          <input className="login__input" type="email" name="email" placeholder="Email"></input>
          <input className="login__input" type="password" name="password" placeholder="Пароль"></input>
          <button className="login__button">Зарегестрироваться</button>
          <Link className="login__register">Уже зарегистрированы? Войти</Link>
        </form>
       
      </div>
    </div>

    )
}

export default Login