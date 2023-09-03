import successImg from '../images/logo/success.svg';
import erroeImg from '../images/logo/error.svg';
import { useState } from "react";
import { useEffect } from 'react';

function InfoTooltip({ isOpen, onClose, name, typeInfo, textInfo }) {
    const [infoObject, setInfoObject] = useState({});

    useEffect(() => {
        function closePopupOnEsc(evt) {
            if (evt.key === 'Escape') {
                onClose();
            }
        }

        if (isOpen) {
            const infoObject = {};
            if (typeInfo === 'success') {
                infoObject.name = 'Ошибка';
                infoObject.img = successImg;
                infoObject.textInfo = textInfo;
    
            }
            if (typeInfo === 'error') {
                infoObject.name = 'Успех';
                infoObject.img = erroeImg;
                infoObject.textInfo = textInfo;
            }
            setInfoObject(infoObject);
            document.addEventListener('keydown', closePopupOnEsc);
            return () => {
                document.removeEventListener('keydown', closePopupOnEsc);
            }
        }
    }, [isOpen]);

    return (
        <div className={`popup popup_type_${name}` + (isOpen ? ' popup_opened' : '')}>
            <div className="popup__container">
                <button className="popup__btn-close" type="button" onClick={onClose} aria-label="Закрыть модальное окно"></button>
                <img className="popup__img-status" src={infoObject.img} alt={`Картинка - "${infoObject.name}"`}></img>
                <h2 className="popup__status-text">{infoObject.textInfo}</h2>
            </div>
        </div>
    )
}

export default InfoTooltip;