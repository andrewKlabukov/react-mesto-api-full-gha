class Api {
  constructor(options) {
    this._url = options.baseUrl
    this._auth = localStorage.getItem('jwt')
  }
  postCard(name, link) {
    const jwt = localStorage.getItem('jwt')
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._checkResponse(res))
  }

  patchText(data) {
    const jwt = localStorage.getItem('jwt')
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
      .then(res => this._checkResponse(res))
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(res => this._checkResponse(res))
  }

  getCards(jwt) {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: jwt,
        "Content-Type": "application/json"
      },
    })
      .then(res => this._checkResponse(res))
  }

  changeLikeCardStatus(cardId, isLiked, jwt) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: {
        authorization: jwt,
        "Content-Type": "application/json",
      },
    }).then(res => this._checkResponse(res))
  }

  getLikesCoins(cardId) {
    const jwt = localStorage.getItem('jwt')
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }

  deleteLikesCoins(cardId, jwt) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }

  deleteCard(cardId, jwt) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      }
    })
      .then(res => this._checkResponse(res))
  }

  changeAvatar(link, jwt) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: jwt,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._checkResponse(res))
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status)
  }

}

export const api = new Api({
  baseUrl: `https://api.andreykla.students.nomoreparties.sbs`,
  headers: {
    authorization: 'af74f13f-cd15-4606-af66-aedf471dfe51',
    'Content-Type': 'application/json'
  }
}
);
