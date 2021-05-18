import { useRef } from "react";
import StartMenu from "./StartMenu";

function Login(props){

  const emailRef = useRef('')
  const passwordRef = useRef('')

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onLoginUser({
      email: emailRef.current.value,
      password: passwordRef.current.value
    });
    evt.target.reset()
  }

  return(
    <StartMenu 
      name='login'
      title='Вход'
      forLogin=''
      saveButton={props.saveButton.login}
      saveButtonInvalid={props.saveButton.invalid}
      saveButtonClick={props.saveButtonClick}
      onSubmit={handleSubmit}
    >
      <input ref={emailRef} className="form__text form__text_place_start-menu" type="email" id="email-login" name="email-login" required placeholder="Email"  autoComplete="off"  />
      <input ref={passwordRef} className="form__text form__text_place_start-menu" type="password" id="password-login" name="password-login" required placeholder="Пароль" minLength="2" maxLength="200" autoComplete="off" />
    </StartMenu>
  )
}

export default Login