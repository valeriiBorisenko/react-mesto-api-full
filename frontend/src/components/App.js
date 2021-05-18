import { useState, useEffect } from 'react';
import { Route, Switch, Redirect, useLocation, useHistory} from 'react-router-dom';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {UserDataContext} from '../contexts/UserDataContext';
import api from '../utils/api';
import auth from '../utils/auth';
import {saveButtonName} from '../utils/utils';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import DeletePopup from './DeletePopup';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';

function App() {
    
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState(false)
  const [currentUser, setCurrentUser] = useState('')
  const [cards, setCards] = useState([])
  const [saveButton, setSaveButton] = useState(saveButtonName.standart)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userData, setUserData] = useState([])
  const [clickIcon, setClickIcon] = useState(false)
  const [isInfoTooltip, setIsInfoTooltip] = useState(false)
  const [resultRegister, setResultRegister] = useState(true)
  const browserLocation = useLocation()
  const history = useHistory()

  useEffect(()=> {
    if (loggedIn){
     Promise.all([api.getUserData(), api.getAllCards()])
      .then(([data, cards])=>{ 
        setCurrentUser(data)
        setCards(cards)
      })
      .catch((err) => {
        console.log(err);
      })
    }
  }, [loggedIn])

  useEffect(() => {
    const clickOverlay = (evt) =>{
      if (evt.target.classList.contains('popup_visible')){
        closeAllPopups()
      }
    }
    const clickEscape = (evt) =>{
      if(evt.key === 'Escape'){
        closeAllPopups()
      }
    }
    if((isEditProfilePopupOpen|| isEditAvatarPopupOpen || isAddPlacePopupOpen || isImagePopupOpen || isDeletePopupOpen || isInfoTooltip) === true){
      window.addEventListener('click', clickOverlay);
      window.addEventListener('keyup', clickEscape);
    }
    return () => {
      window.removeEventListener('click', clickOverlay);
      window.removeEventListener('keyup', clickEscape);
    }
  }, [isEditProfilePopupOpen, isEditAvatarPopupOpen, isAddPlacePopupOpen, isImagePopupOpen, isDeletePopupOpen, isInfoTooltip])

  useEffect(() => {
    if (loggedIn) {
      history.push("/main");
    }
  }, [loggedIn, history])

  useEffect(() => {
    checkTokenUser()
  }, [])

  function handleCardLike(props){
    const isLiked = props.likes.some(item => item === currentUser._id)
    api
    .changeLikeCardStatus(props._id, !isLiked)
    .then((newCard) => {setCards((state) => state.map((c) => c._id === props._id ? newCard : c))})
    .catch((err) => {console.log(err)})
  }

  function handleCardDelete(props){
    api
    .deleteCard(props._id)
    .then(()=> setCards(cards.filter(newCards=> newCards._id !== props._id )))
    .then(()=> closeAllPopups())
    .catch((err) => {console.log(err)})
  }

  function handleUpdateUser(data){
    api
    .setUserInfo(data)
    .then((data)=> {setCurrentUser(data)})
    .then(()=> closeAllPopups())
    .catch((err)=>{
      console.log(err) 
      setSaveButton(saveButtonName.error)
      setTimeout(() => setSaveButton(saveButtonName.standart), 3000)
     })
  }

  function handleUpdateAvatar(data){
    api
    .setUserAvatar(data)
    .then((data)=> {setCurrentUser(data)})
    .then(()=> closeAllPopups())
    .catch((err)=>{
      console.log(err)
      setSaveButton(saveButtonName.error)
      setTimeout(() => setSaveButton(saveButtonName.standart), 3000)
    })
  }

  function handleAddPlaceSubmit(data){
    api
    .setNewCard(data)
    .then((newCard)=> {setCards([newCard, ...cards])})
    .then(()=> closeAllPopups())
    .catch((err)=>{
      console.log(err)
      setSaveButton(saveButtonName.error)
      setTimeout(() => setSaveButton(saveButtonName.standart), 3000)
    })
  }

  function handleRegisterUser(data){
    auth
    .setRegisterUser(data)
    .then((data) => {
    setUserData(data.email)
    })
    .then(() => {
      setIsInfoTooltip(true)
      setResultRegister(true)
      history.push('/sign-in')
    })
    .catch((err)=>{
      setIsInfoTooltip(true)
      setResultRegister(false)
      console.log(err) 
    })
    .finally(()=> setTimeout(() => setSaveButton(saveButtonName.standart), 3000))
  }

  function handleLoginUser(data){
    auth
    .setLoginUser(data)
    .then((data)=>{
        localStorage.setItem('token', data.token)
        checkTokenUser()
    })
    .then(()=>{
      history.push('/main')
    })
    .catch((err)=>{
      console.log(err)
      setIsInfoTooltip(true)
      setResultRegister(false)
    })
    .finally(()=>setSaveButton(saveButtonName.standart), 3000)
  }

  function checkTokenUser(){
    if (localStorage.getItem('token')) {
      api.updateToken()
      const token = localStorage.getItem('token');
        if (token) {
          auth
          .getUserToken(token)
          .then((res) => {
          setLoggedIn(true)
          setUserData(res.email)
          setCurrentUser(res)
        })
      };
    }
  }

  function signOut(){
    localStorage.removeItem('token');
    history.push('/sign-in');
    closeAllPopups()
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick(){
    setIsAddPlacePopupOpen (true)
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(true)
  }

  function handleCardClick(card){
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  }

   function handleDeleteCardClick(card){
    setSelectedCard(card)
    setIsDeletePopupOpen(true)
  }

  function handleChangeSaveButton(){
    setSaveButton(saveButtonName.afterClick)
  }

  function handleOnClickIcon(){
    setClickIcon(true)
  }

  function closeAllPopups(){
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen (false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeletePopupOpen(false)
    setClickIcon(false)
    setIsInfoTooltip(false)
    setSaveButton(saveButtonName.standart)
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
        <UserDataContext.Provider value={userData}>
          <div className="app">
            <Header
              browserLocation={browserLocation.pathname}
              isClickIconOpen={clickIcon}
              onMobileMenu={handleOnClickIcon}
              onClose={closeAllPopups}
              signOut={signOut}
            />
            <main className="content">
              <Switch>
              <Route path="/sign-up">
                <Register
                  saveButtonClick={handleChangeSaveButton}
                  saveButton={saveButton}
                  onRegisterUser={handleRegisterUser}
                />
              </Route>
              <Route path="/sign-in">
                <Login
                  saveButtonClick={handleChangeSaveButton}
                  saveButton={saveButton}
                  onLoginUser={handleLoginUser}
                />
              </Route>
              <ProtectedRoute 
                path="/main"
                loggedIn={loggedIn}
              >
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDeletePopup={handleDeleteCardClick}
                  cards={cards}
                />
              </ProtectedRoute>
              <Route exact path="/*">
                {loggedIn? <Redirect to="/main"/>:<Redirect to="/sign-in"/>}
              </Route>
              </Switch>
              <EditProfilePopup 
                isOpen={isEditProfilePopupOpen} 
                onClose={closeAllPopups} 
                onUpdateUser={handleUpdateUser}
                saveButtonClick ={handleChangeSaveButton}
                saveButton={saveButton}
              />
              <EditAvatarPopup 
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                saveButtonClick={handleChangeSaveButton}
                saveButton={saveButton}
              />
              <AddPlacePopup 
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                saveButtonClick={handleChangeSaveButton}
                saveButton={saveButton}
              />
              <DeletePopup
                card={selectedCard}
                isOpen={isDeletePopupOpen}
                onClose={closeAllPopups} 
                onCardDelete={handleCardDelete}
                saveButtonClick={handleChangeSaveButton}
                saveButton={saveButton}
              />
              <ImagePopup
                card={selectedCard}
                isOpen={isImagePopupOpen}
                onClose={closeAllPopups}
              />
              <InfoTooltip
                isOpen={isInfoTooltip}
                onClose={closeAllPopups}
                resultRegister={resultRegister}
              />
            </main>
          <Footer/>    
        </div>
      </UserDataContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
