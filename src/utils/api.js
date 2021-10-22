class Api {
  constructor(data) {
    this._URL = data.URL
  }

  getPages(page) {
    return fetch(`${this._URL}users?page=${page}&per_page=3`, {
      method: 'GET',
    })
      .then((res) => {
        return res.json();
      })
        .then((res) => {
          return res;
        })
          .catch((err) => {
            return Promise.reject(`ERROR: ${err.status}`)
          });
  }

  signup(data) {
    return fetch(`${this._URL}register`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': data.email,
        'password': data.password
      })
    })
      .then((res) => {
        return res
      })
        .catch((err) => {
          return Promise.reject(`ERROR: ${err.status}`)
        });
  }

  signin(data) {
    return fetch(`${this._URL}login`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        'email': data.email,
        'password': data.password
      })
    })
      .then((res) => {
        return res;
      })
          .catch((err) => {
            return Promise.reject(`ERROR: ${err.status}`)
          });
  }
  
}

const api = new Api({
  // URL: 'https://jsonplaceholder.typicode.com'
  URL: 'https://reqres.in/api/'
})

export default api;