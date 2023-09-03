import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authApi } from "../utils/authApi";

function Login({ openInfoModal, hadleLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoad, setIsLoad] = useState(false);
    const navigate = useNavigate();

    function handleChangeEmail(evt) {
        setEmail(evt.target.value)
    }

    function handleChangePassword(evt) {
        setPassword(evt.target.value)
    }

    function onLogin(evt) {
        evt.preventDefault();
        setIsLoad(true);
        authApi.authorize(email, password)
            .then(data => {
                if (data) {
                    setEmail('');
                    setPassword('');
                    hadleLogin(true);
                    navigate('/');
                    openInfoModal('success', 'Вы успешно авторизовались!');
                }
            })
            .catch(err => {
                console.log(err);
                openInfoModal('error', 'Что-то пошло не так! Попробуйте ещё раз.');
            })
            .finally(() => setIsLoad(false))
    }

    return (
        <div className="auth">
            <form className="auth__form" name="login" onSubmit={onLogin}>
                <h1 className="auth__title">Вход</h1>
                <input className="auth__input auth__input_type_email"
                    onChange={(evt) => handleChangeEmail(evt)}
                    value={email}
                    disabled={isLoad}
                    name="email" type="email"
                    placeholder="Email" />
                <input className="auth__input auth__input_type_password"
                    onChange={(evt) => handleChangePassword(evt)}
                    value={password}
                    name="password" type="password"
                    placeholder="Пароль" />
                <button className="auth__button" type="submit">Войти</button>
            </form>
        </div>
    )
}

export default Login;
