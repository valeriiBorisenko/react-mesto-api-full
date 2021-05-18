function PopupWithForm(props){

  return(
    <section className={`popup popup_place_${props.name} ${props.isOpen? 'popup_visible' : ''}`}>
      <div className={`popup__window popup__window_place_${props.name}`}>
        <button className="link-opacity button button__close" type="button"
          aria-label="закрыть" onClick={props.onClose}/>
        <h2 className="popup__title">{props.title}</h2>
        <form className="form" name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className={`button button__save ${props.saveButtonInvalid}`} type="submit" onClick={props.saveButtonClick}>{props.saveButton}</button>
        </form>
      </div>
    </section>
  )
}

export default PopupWithForm