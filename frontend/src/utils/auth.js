import {onError} from '../utils/utils'

class Auth{
  constructor({url}){
    this._url = url;
  }

  setRegisterUser(data){
    return fetch(`${this._url}/signup`,{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    })
    .then(onError)
  }

  setLoginUser(data){
    return fetch(`${this._url}/signin`,{
      method: "POST",
      headers: {"Content-type": "application/json"},
      body: JSON.stringify({
        email: data.email,
        password: data.password
      }),
    })
    .then(onError)
  }

  getUserToken(token){
    return fetch(`${this._url}/users/me`,{
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(onError)
  }
}

const auth = new Auth ({
  url: "http://api.mesto-valeriiB.nomoredomains.rocks",
})

export default auth