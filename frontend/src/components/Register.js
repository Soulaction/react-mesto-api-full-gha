import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../utils/authApi";

function Register({  openInfoModal }) {
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

    function onRegister(evt) {
        evt.preventDefault();
        setIsLoad(true)
        authApi.register(email, password)
            .then((data) => {
                openInfoModal('success', 'Вы успешно зарегестрировались!');
                navigate('/sign-in')
            })
            .catch(err => {
                console.log(err);
                openInfoModal('error', 'Что-то пошло не так! Попробуйте ещё раз.');
            })
            .finally(() => setIsLoad(false))
    }

    return (
        <div className="auth">
            <form className="auth__form" name="login" onSubmit={onRegister}>
                <h1 className="auth__title">Регистрация</h1>
                <input className="auth__input auth__input_type_email"
                    onChange={(evt) => handleChangeEmail(evt)}
                    value={email}
                    disabled={isLoad}
                    name="email" type="email"
                    placeholder="Email" />
                <input className="auth__input auth__input_type_password"
                    onChange={(evt) => handleChangePassword(evt)}
                    value={password}
                    disabled={isLoad}
                    name="password" type="password"
                    placeholder="Пароль" />
                <button className="auth__button" type="submit" disabled={isLoad}>Зарегистрироваться</button>
                <p className="auth__question-text">Уже зарегистрированы? <Link className="auth__link-up" to='/sign-in'>Войти</Link></p>
            </form>
        </div>
    )
}

export default Register;