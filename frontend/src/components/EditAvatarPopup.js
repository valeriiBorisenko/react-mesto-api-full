import { useRef } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props){

  const avatarRef = useRef('');

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({avatar: avatarRef.current.value});
    evt.target.reset()
  } 

  return(
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      saveButton={props.saveButton.saveAvatar}
      saveButtonInvalid={props.saveButton.invalid}
      saveButtonClick={props.saveButtonClick}
    >
      <input className="form__text" type="url" id="avatar" name="avatar" required placeholder="Ссылка на аватар" autoComplete="off" ref={avatarRef}/>
    </PopupWithForm>
  )
}

export default EditAvatarPopup