import { useEffect } from "react";

function ImagePopup({isOpen, onClose, card, name}) {
    useEffect(() => {
        function closePopupOnEsc(evt) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', closePopupOnEsc);
            return () => {
                document.removeEventListener('keydown', closePopupOnEsc);
            }
        }
    }, [isOpen])

    return (
        <div className={`popup popup_type_${name}` + (isOpen ? ' popup_opened' : '')}>
            <div className="popup__container-card">
                <button className="popup__btn-close" type="button" onClick={onClose} aria-label="Закрыть модальное окно"></button>
                <img className="popup__img-card" src={card?.link} alt={`Картинка - "${card?.name}"`}></img>
                <h2 className="popup__name-card">{card?.name}</h2>
            </div>
        </div>
    );
}

export default ImagePopup;