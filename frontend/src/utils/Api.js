const optionsApi = {
    baseUrl: 'https://api.mesto-ray.students.nomoreparties.co',
    headers: {
        'Content-Type': 'application/json',
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

    _getToken() {
        const jwt = localStorage.getItem('jwt');
        return {
            Authorization: `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    getUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }

    createUser(name, about) {
        console.log(name, about);
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getToken(),
            body: JSON.stringify({ name, about }),
        })
            .then(this._checkResponse);
    }

    getCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }

    postCard(card) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getToken(),
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
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }

    addLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'PUT',
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }

    deleteLike(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: this._getToken(),
        })
            .then((res) => this._checkResponse(res));
    }

    patchAvatar({ avatar }) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getToken(),
            body: JSON.stringify({ avatar }),
        })
            .then((res) => this._checkResponse(res));
    }
}


const api = new Api(optionsApi);

export default api;