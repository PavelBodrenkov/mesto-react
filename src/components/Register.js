import React from 'react'
import {Link} from 'react-router-dom'



function Register ({rout}) {


    return(
      <div className="register">
      <div className="register__container">
        <form action="#" id="form_reset" className="register__form" name noValidate>
          <h2 className="register__title">Регистрация</h2>
          <input className="register__input" type="email" name="email" placeholder="Email"></input>
          <input className="register__input" type="password" name="password" placeholder="Пароль"></input>
          <button className=" button button_type_register">Зарегистрироваться</button>
          <Link onClick={() => rout(true)} to={'/login'} className="register__login">Уже зарегистрированы? Войти</Link>
        </form>
       
      </div>
    </div>

    )
}

export default Register