class Api {
  constructor(data) {
    this._URL = data.URL
  }

  // getPost(page) {
  //   return fetch(`${this._URL}/posts/?_limit=3&_page=${page}`, {
  //     method: 'GET',
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //       .then((res) => {
  //         return res;
  //       })
  //         .catch((err) => {
  //           return Promise.reject(`ERROR: ${err.status}`)
  //         });
  // }
  getPost(page) {
    return fetch(`${this._URL}users?page=${page}`, {
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
  
}

const api = new Api({
  // URL: 'https://jsonplaceholder.typicode.com'
  URL: 'https://reqres.in/api/'
})

export default api;