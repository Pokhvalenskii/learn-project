class Api {
  constructor(data) {
    this._URL = data.URL
  }

  getPost(page) {
    return fetch(`${this._URL}/posts/?_limit=5&_page=${page}`)
  }
}

const api = new Api({
  urlApi: 'https://jsonplaceholder.typicode.com'
})

export default api;