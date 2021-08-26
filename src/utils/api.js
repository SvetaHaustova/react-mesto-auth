class Api {
    constructor({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    //Проверить ответ от сервера

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //Получить карточки с сервера

    getInitialCards() {
        return fetch(`${this._url}/cards`, { headers: this._headers })
        .then((res) => this._checkResponse(res))
    }

    //Добавить новую карточку места на сервер

    addNewCard({ name, link }) {
        return fetch(`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
        .then((res) => this._checkResponse(res))
    }

    //Удалить карточку места

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then((res) => this._checkResponse(res))
    }

    //Поставить/удалить лайк карточке

    changeLikeCardStatus(cardId, isLiked) {
        if (isLiked) {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then((res) => this._checkResponse(res))
        } else {
            return fetch(`${this._url}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then((res) => this._checkResponse(res))
        }
    }

    //Получить данные пользователя

    getUserInfo() {
        return fetch(`${this._url}/users/me`, { headers: this._headers })
        .then((res) => this._checkResponse(res))
    }

    //Отредактировать данные пользователя

    editUserInfo({ name, profession }) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: profession
            })
        })
        .then((res) => this._checkResponse(res))
    }

    //Отредактировать аватар пользователя

    editAvatarUser({ avatar }) {    
        return fetch(`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: avatar
            })
        })
        .then((res) => this._checkResponse(res))
    }
}

const api = new Api({
    url: 'https://nomoreparties.co/v1/cohort-25',
    headers: {
        authorization: 'a7473b4e-4df8-4060-a905-03a96de8bd8c',
        'Content-Type': 'application/json'
    }
});

export default api;