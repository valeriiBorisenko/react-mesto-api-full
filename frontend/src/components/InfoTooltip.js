import unionDone from '../image/icon/Union_done.svg'
import unionError from '../image/icon/Union_error.svg'

function InfoTooltip(props){

  const changeTitle = props.resultRegister===true? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'
 
  return(
    <section className={`popup popup_place_info ${props.isOpen? 'popup_visible' : ''}`}>
      <div className="popup__window popup__window_place_info">
        <button className="link-opacity button button__close button__close_place_info" type="button" aria-label="закрыть" onClick={props.onClose}/>
        <div className="popup__info-icon" style={{backgroundImage: `url(${props.resultRegister===true? unionDone : unionError})`}}
/>
        <h2 className="popup__title popup__title_place_info">{changeTitle}</h2>
      </div>
    </section>
  )
}

export default InfoTooltip