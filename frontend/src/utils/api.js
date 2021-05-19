import {onError} from '../utils/utils'

class Api{
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  getUserData(){
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers
  })
  .then(onError)
  }

  
  getAllCards(){
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers
    })
    .then(onError)
  }


  changeLikeCardStatus(id, isLiked){
    return fetch(`${this._url}/cards/likes/${id}`, {
      method: `${isLiked? "PUT" : "DELETE"}`,
      headers: this._headers
    })
    .then(onError)
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
    .then(onError)
  }

  setUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about}),
  })
  .then(onError)
  }

  setUserAvatar(avatar){
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
  })
  .then(onError)
  }

  setNewCard(data){
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      }),
    })
    .then(onError)
  }

  updateToken(){
    this._headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  }

}

const api = new Api ({ 
  url: "http://api.mesto-valeriiB.nomoredomains.rocks",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`
  }
})

export default api