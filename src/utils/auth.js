class Auth {
  constructor(data) {
    this._URL = data.URL
  }

  _checkResponses (res) {
    if(res.ok) {
      return res.json();
    } return Promise.reject(`Ошибка: ${res.status}`);
  }

  signup(data) {
    return fetch(`${this._URL}/register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'name': data.name,
        'email': data.email,
        'password': data.password,
        'password_confirmation': data.password_confirmation
      })
    })
      .then(this._checkResponses);
  }

  signin(data) {
    return fetch (`${this._URL}/token`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': data.email,
        'password': data.password
      })
    })
      .then(this._checkResponses);
  }
}

const auth = new Auth({
  URL: 'http://test.flcd.ru/api'
})

export default auth;