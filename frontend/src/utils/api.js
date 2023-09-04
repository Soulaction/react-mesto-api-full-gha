class Api {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.token = options.headers.authorization;
        this.contentType = options.headers['Content-Type'];
    }

    _fetch(url, option) {
        return fetch(this.baseUrl + url, option)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(err => {
                        throw err.message
                    });
                }
            })
    }

    getInitialCards() {
        return this._fetch('/cards', {
            method: 'GET',
            credentials: 'include',
        });
    }

    getUserInfo() {
        return this._fetch('/users/me', {
            method: 'GET',
            credentials: 'include',
        });
    }

    updateUserInfo({name, about}) {
        return this._fetch('/users/me', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': this.contentType
            },
            body: JSON.stringify({
                name,
                about
            })
        });
    }

    updateAvatarUser({avatar}) {
        return this._fetch('/users/me/avatar', {
            method: 'PATCH',
            credentials: 'include',
            headers: {
                'Content-Type': this.contentType
            },
            body: JSON.stringify({
                avatar
            })
        });
    }

    addNewCard({name, link}) {
        return this._fetch('/cards', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': this.contentType
            },
            body: JSON.stringify({
                name,
                link
            })
        });
    }

    deleteCard(cardId) {
        return this._fetch(`/cards/${cardId}`, {
            method: 'DELETE',
            credentials: 'include',
        });
    }

    changeLikeCardStatus(cardId, isLike) {
        if (isLike) {
            return this._fetch(`/cards/${cardId}/likes`, {
                method: 'DELETE',
                credentials: 'include',
            });
        } else {
            return this._fetch(`/cards/${cardId}/likes`, {
                method: 'PUT',
                credentials: 'include',
            });
        }
    }
}

//Создание объекта API
export const api = new Api({
    baseUrl: 'http://pictures.nomoredomainsicu.ru/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});
