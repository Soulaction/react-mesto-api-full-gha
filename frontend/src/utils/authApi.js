class AuthApi {
    constructor(options) {
        this.baseUrl = options.baseUrl;
        this.contentType = options.headers['Content-Type'];
    }

    _fetch(path, option) {
        return fetch(this.baseUrl + path, option)
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return res.json().then(err => {
                        throw err.message
                    });
                }
            });
    }

    register(email, password) {
        return this._fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': this.contentType
            },
            body: JSON.stringify({email, password})
        });
    }

    authorize(email, password) {
        return this._fetch('/signin', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': this.contentType
            },
            body: JSON.stringify({email, password})
        });
    }

    checkToken() {
        return this._fetch('/users/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': this.contentType
            }
        });
    }
    logout() {
        return this._fetch('/signout', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': this.contentType
            }
        });
    }
}

export const authApi = new AuthApi({
    baseUrl: 'http://api.pictures.nomoredomainsicu.ru',
    headers: {
        'Content-Type': 'application/json'
    }
})
