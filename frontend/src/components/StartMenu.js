function StartMenu(props){

  return(
    <section className={`start-menu start-menu_place_${props.name}`}>
      <div className="start-menu__container">
        <h2 className="start-menu__title">{props.title}</h2>
        <form className="form" name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className={`button__save button__save_place_start-menu ${props.saveButtonInvalid}`} type="submit" onClick={props.saveButtonClick}>{props.saveButton}</button>
          {props.forLogin}
        </form>
      </div>
    </section>
  )
}

export default StartMenu