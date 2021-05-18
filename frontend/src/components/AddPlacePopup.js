import PopupWithForm from './PopupWithForm';
import { useRef } from 'react';

function AddPlacePopup (props){
  
  const newNameRef = useRef('')
  const newLinkRef = useRef('')

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name: newNameRef.current.value,
      link: newLinkRef.current.value
    });
    evt.target.reset()
  }

  return(
    <PopupWithForm
      name='element'
      title='Новое место'
      isOpen={props.isOpen} 
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButton={props.saveButton.addImage}
      saveButtonInvalid={props.saveButton.invalid}
      saveButtonClick={props.saveButtonClick}
    >
      <input ref={newNameRef} className="form__text" type="text" id="name-card" name="name"
        required placeholder="Название" minLength="2" maxLength="30" autoComplete="off"/>
      <input ref={newLinkRef} className="form__text" type="url" id="link" name="link" required
        placeholder="Ссылка на картинку" autoComplete="off"/>
    </PopupWithForm>
  )
}

export default AddPlacePopup 