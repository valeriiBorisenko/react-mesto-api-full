import { useRef } from "react";
import { Link } from "react-router-dom";
import StartMenu from "./StartMenu";

function Register(props){

  const newEmailRef = useRef('')
  const newPasswordRef = useRef('')

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegisterUser({
      email: newEmailRef.current.value,
      password: newPasswordRef.current.value
    });
    evt.target.reset()
  }

  return(   
    <StartMenu
      name='register'
      title='Регистрация'
      forLogin={
        <p className="start-menu__for-login">Уже зарегистрированы? <Link className="link-opacity start-menu__link" to="/sign-in">Войти</Link></p>}
      saveButton={props.saveButton.regist}
      saveButtonInvalid={props.saveButton.invalid}
      saveButtonClick={props.saveButtonClick}
      onSubmit={handleSubmit}
    >
      <input ref={newEmailRef} className="form__text form__text_place_start-menu " type="email" id="email-register" name="email-register" required placeholder="Email"  autoComplete="off"/>
      <input ref={newPasswordRef} className="form__text form__text_place_start-menu " type="password" id="password-register" name="password-register" required placeholder="Пароль" minLength="2" maxLength="200" autoComplete="off"/>
    </StartMenu>
  )
}

export default Register