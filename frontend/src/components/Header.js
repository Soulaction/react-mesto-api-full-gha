import {Link, useLocation} from "react-router-dom";
import logo from "../images/logo/logo.svg";
import {CurrentUserContext} from "../context/CurrentUserContext";
import {useContext, useState} from "react";
import {api} from "../utils/api";
import {authApi} from "../utils/authApi";

function Header({loggedIn, handleLogin}) {
    const {authUser} = useContext(CurrentUserContext);
    const [isOpenMenu, setIsOpenMenu] = useState(false)
    const location = useLocation();

    function checkUserToBe() {
        if (location.pathname === '/sign-up') {
            return {path: '/sign-in', label: 'Войти'};
        }
        if (location.pathname === '/sign-in') {
            return {path: '/sign-up', label: 'Регистрация'};
        }
        if (location.pathname === '/') {
            return {path: '/sign-in', label: 'Выйти'};
        }
    }

    function onSignOut() {
        authApi.logout()
            .then(data => {
                handleLogin(false);
            })
            .catch(err => console.log('Ошибка: ' + err));
    }

    return (
        <>
            <div
                className={`${isOpenMenu ? '' : 'header__menu-items_close'} ${loggedIn ? 'header__menu-items' : 'is-not-login'}`}>
                {loggedIn && <p className="header__user-email">{authUser?.email}</p>}
                <Link className="header__link" to={checkUserToBe()?.path}
                      onClick={onSignOut}>{checkUserToBe()?.label}</Link>
            </div>
            <header className="header">
                <img className="header__logo" src={logo} alt="Логотип"></img>
                <div className="header__user-info">
                    {loggedIn && <p className="header__user-email">{authUser?.email}</p>}
                    <Link className="header__link" to={checkUserToBe()?.path}
                          onClick={onSignOut}>{checkUserToBe()?.label}</Link>
                </div>
                <div
                    className={`${isOpenMenu ? 'header__menu_close' : 'header__menu_open'} ${loggedIn ? 'header__menu' : 'is-not-login'}`}
                    onClick={() => setIsOpenMenu(!isOpenMenu)}>
                </div>
            </header>
        </>
    );
}

export default Header;
