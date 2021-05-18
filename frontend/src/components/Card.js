import { useContext } from "react";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Card(props){

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const isLiked = props.likes.some(item => item === currentUser._id);
  const cardDeleteButtonClassName = (`button__delete ${isOwn ? 'button__delete_active' : ''}`); 
  const cardLikeButtonClassName = (`button__like ${isLiked ? 'button__like_active' : ''}`);

  function handleClick() {
    props.onCardClick(props);
  }
  
  function handleLikeClick (){
    props.onCardLike(props)
  }

  function handleCardDeleteClick(){
    props.onCardDeletePopup(props)
  }
 
  return(
      <li className="element">
        <button className={`button ${cardDeleteButtonClassName}`} type="button" aria-label="удалить" onClick={handleCardDeleteClick}/>
        <img className="element__image" src={props.link} alt={props.name} onClick={handleClick}/>
        <div className="element__container">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__container-like">
            <button className={`button ${cardLikeButtonClassName}`} type="button" aria-label="нравится" onClick={handleLikeClick}/>
            <span className="element__like-counter" id="like-counter">{props.likes.length}</span>
          </div>
        </div>
      </li>
  )
}

export default Card
