import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";
import { useEffect, useState } from "react";

function AddPlacePopup({ isOpen, isLoading, onClose, onAddPlace }) {
    const [name, setName] = useState('');
    const [link, setLink] = useState('');
    const validationName = useValidation();
    const validationLink = useValidation();

    useEffect(() => {
        setName('');
        setLink('');
        validationName.onReset();
        validationLink.onReset();
    }, [isOpen]);

    function handleChangeName(inputForm) {
        validationName.checkValidate(inputForm);
        setName(inputForm.value);
    }

    function handleChangeLink(inputForm) {
        validationLink.checkValidate(inputForm);
        setLink(inputForm.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name,
            link
        });
    }

    return (
        <PopupWithForm title={'Новое место'}
            name={'card-edit'}
            textButton="Cохранить"
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            validForm={validationName.isInputValid && validationLink.isInputValid}
            onSubmit={handleSubmit}
        >
            <input id="name-card"
                className={`popup__input popup__input_type_name-card ${validationName.isInputError ? 'popup__input_type_error' : ''}`}
                name="name"
                minLength="2"
                onChange={evt => handleChangeName(evt.target)}
                value={name} disabled={isLoading}
                maxLength="30" required
                placeholder="Название"/>
            <span className={`popup__error name-card-error ${validationName.isInputError ? 'popup__error_visible' : ''}`}>{validationName.validationMessage}</span>
            <input id="url-img"
                className={`popup__input popup__input_type_url-img ${validationLink.isInputError ? 'popup__input_type_error' : ''}`}
                name="link"
                type="url" required
                onChange={evt => handleChangeLink(evt.target)}
                value={link} disabled={isLoading}
                placeholder="Ссылка на картинку"/>
            <span className={`popup__error url-img-error ${validationLink.isInputError ? 'popup__error_visible' : ''}`}>{validationLink.validationMessage}</span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;