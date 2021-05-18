function ImagePopup(props){

  return(
    <section className={`popup popup_place_image ${props.isOpen? 'popup_visible' : ''}`}>
      <figure className="popup__window popup__window_place_image">
        <button className="link-opacity button button__close" type="button" aria-label="закрыть" onClick={props.onClose}/>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <figcaption className="popup__title popup__title_place_image">{props.card.name}</figcaption>
      </figure>
    </section>
  )
}

export default ImagePopup