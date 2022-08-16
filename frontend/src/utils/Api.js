import { responseAnalysis } from './response';

class Api {
    constructor(item) {
        this._baseUrl = item.baseUrl;
        this._headers = item.headers;
    }

    _responseAnalysis(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    }

    _getHeaders() {
        const jwt = localStorage.getItem('jwt');
        return {
            'Authorization': `Bearer ${jwt}`,
            ...this._headers,
        };
    }

    uploadUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._getHeaders(),
        })
            .then(res => responseAnalysis(res));
    }

    createInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            headers: this._getHeaders(),
        })
            .then(res => responseAnalysis(res));
    }

    deleteImageCard(item) {
        return fetch(`${this._baseUrl}/cards/${item}`, {
            method: 'DELETE',
            headers: this._getHeaders(),
        })
            .then(res => responseAnalysis(res));
    }

    changeLikeCardStatus(item, isLiked) {
        return fetch(`${this._baseUrl}/cards/${item}/likes`, {
            method: `${!isLiked ? 'DELETE' : 'PUT'}`,
            headers: this._getHeaders(),
        })
            .then(res => responseAnalysis(res));
    }

    changeAvatar(item) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                avatar: item.link
            })
        })
            .then(res => responseAnalysis(res));
    }

    changeUserInformation(item) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.name,
                about: item.info
            })
        })
            .then(res => responseAnalysis(res));
    }

    newImageCard(item) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: item.text,
                link: item.url
            })
        })
            .then(res => responseAnalysis(res));
    }
}

const api = new Api({
    baseUrl: 'https://api.alexeysimakin.mesto.nomoredomains.sbs',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;