import { useContext, useEffect } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../context/CurrentUserContext";

function Main({cards, onCardLike , onCardDelete, onEditAvatar, onEditProfile, onAddPlace, onCardClick }) {
    const {authUser} = useContext(CurrentUserContext);

    return (
        <main className="main">
            <section className="profile" aria-label="Информация о профиле пользователя">
                <div className="profile__avatar-container">
                    <img className="profile__avatar" src={authUser?.avatar} alt="Аватарка пользователя"></img>
                    <button className="profile__avatar-edit-btn" type="button" onClick={onEditAvatar}
                        aria-label="Редактировать аватар"></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__nike-name hidden-text">{authUser?.name}</h1>
                    <button className="profile__edit-btn" type="button" onClick={onEditProfile} aria-label="Редактировать профиль"></button>
                    <p className="profile__discription hidden-text">{authUser?.about}</p>
                </div>
                <button className="profile__add-btn" type="button" onClick={onAddPlace} aria-label="Добавить картинку"></button>
            </section>
            <section className="elements" aria-label="Карточки пользователя">
                <ul className="elements-list list">
                    {cards.map(card => <Card key={card._id} card={card} onCardClick={onCardClick} onCardLike={onCardLike } onCardDelete={onCardDelete} />)}
                </ul>
            </section>
        </main>
    );
}

export default Main;
