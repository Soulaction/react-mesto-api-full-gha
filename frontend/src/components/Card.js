import {useContext} from "react";
import {CurrentUserContext} from "../context/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
    const {authUser} = useContext(CurrentUserContext);
    const isOwn = card.owner === authUser._id;

    const cardDeleteButtonClassName = (
        `element__bucket ${isOwn ? '' : 'element_busket_hidden'}`
    );
    const isLiked = card.likes.some(id => id === authUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="element">
            <button className={cardDeleteButtonClassName} type="button" onClick={handleDeleteClick}
                    aria-label="Удалить картинку"></button>
            <img className="element__img" src={card.link} alt={`Картинка - "${card.name}"`} onClick={handleClick}></img>
            <div className="element__info">
                <h2 className="element__name-picture hidden-text">{card.name}</h2>
                <div>
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}
                            aria-label="Поставить лайк"></button>
                    <p className="element__like-count">{card.likes.length}</p>
                </div>
            </div>
        </li>)
}

export default Card;
