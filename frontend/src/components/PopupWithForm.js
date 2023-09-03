import { useEffect } from "react";

function PopupWithForm({ title, name, textButton, isOpen, isLoading, onClose, onSubmit, validForm, children }) {
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
            <div className="popup__container">
                <button className="popup__btn-close" type="button" onClick={onClose} aria-label="Закрыть модальное окно"></button>
                <form className={`popup__form popup__form_type_${name}`} name={name} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__title">{title}</h2>
                    {children}
                    <button disabled={!validForm || isLoading}
                        className={`popup__btn-submit ${!validForm || isLoading ? 'popup__btn-submit_disabled' : ''} ${name === 'confirm' ? 'popup__btn-submit_confirm' : ''}`}
                        type="submit">
                        {isLoading ? name === 'confirm' ? 'Удаление...' : 'Сохранение...' : textButton}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;