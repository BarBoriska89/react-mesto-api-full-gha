const optionsApi = {
    baseUrl: 'http://api.mesto-ray.students.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
};

class Api {
    constructor(optionsApi) {
        this._baseUrl = optionsApi.baseUrl;
        this._headers = optionsApi.headers;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    createUser(name, about) {
        console.log(name, about);
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ name, about }),
        })
            .then((res) => {
                //this._checkResponse(res);
                if (res.ok){
                   const i = res.json();
                   console.log(i);
                   return i;
                }
                else {
                    Promise.reject(`Error!!!${res.status}`);
                }
            })
            .then((resp) => console.log(resp));
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    postCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: card.name,
                link: card.link,
            }),
        })
            .then((res) => this._checkResponse(res));
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._headers,
        })
            .then((res) => this._checkResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._headers,
        })
    }
    .then((res) =>     }
            );
    }

    patchAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({ avatar }),
        })
            .then((res) => this._checkResponse(res));
    }
}


const api = new Api(optionsApi);

export default api;