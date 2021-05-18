import { useContext } from "react";
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main (props){

  const currentUser = useContext(CurrentUserContext)

  return(
    <>
      <section className="profile">
        <div className="profile__content">
          <div className="profile__avatar-container">
            <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})`}}  aria-label="аватарка пользователя"/>
            <button className="button button__edit button__edit_place_avatar" aria-label="редактировать аватар"
              type="button" onClick={props.onEditAvatar}/>
          </div>
          <div className="profile__container">
            <div className="profile__title-container">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button className="link-opacity button button__edit" aria-label="редактировать профиль" type="button" onClick={props.onEditProfile}/>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button className="link-opacity button button__add" aria-label="добавить" type="button" onClick={props.onAddPlace}/>
      </section>
      <section className="elements">
        <ul className="elements__container">
          {props.cards.map(item=>
            <Card 
              key={item._id} 
              {...item} 
              onCardClick={props.onCardClick} 
              onCardLike={props.onCardLike} 
              onCardDeletePopup={props.onCardDeletePopup}
            />
          )}
        </ul>
      </section>
    </>
  )
}

export default Main