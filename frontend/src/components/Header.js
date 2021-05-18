import { Link } from "react-router-dom";
import onClickIcon from '../image/icon/hamburger_menu.svg';
import offClickIcon from '../image/icon/Close_Icon.svg';
import { useContext } from "react";
import { UserDataContext } from "../contexts/UserDataContext";

function Header(props){

  const userData = useContext(UserDataContext)
  const location = props.browserLocation
  const userInfo = 
    <>
      <p className="header__user-info">{userData}</p>
      <button className="link-opacity header__button-close" onClick={props.signOut}>Выйти</button>
    </>
  const changeLink = 
    (location === '/sign-in'?
      <Link className="link-opacity header__user-title" to={'/sign-up' || ''}>Регистрация</Link>
    : '') || 
    (location === '/sign-up'?
      <Link className="link-opacity header__user-title" to={'/sign-in' || ''}>Вход</Link>
    : '' ) || 
    (location !== '/sign-in' || '/sign-up'?
      <>
        <div className="header__user-container">
          {userInfo}
        </div>
        <button className="link-opacity button button__menu" 
        style={{backgroundImage: `url(${props.isClickIconOpen===true? offClickIcon : onClickIcon})`}}
        onClick={props.isClickIconOpen===true? props.onClose : props.onMobileMenu }/>
      </>: '' )

  return(
    <header className="header">
      {location !== '/sign-in' || '/sign-up'?
        <div className={`header__mobile-container ${props.isClickIconOpen===true? "header__mobile-container_active" : ""} `}>
          {userInfo}
        </div> : ""}
      <div className="header__container">
        <div className="header__logo"/>
        {changeLink}
      </div>
    </header>
  )
}

export default Header