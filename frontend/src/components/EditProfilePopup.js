import { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { useValidation } from "../hooks/useValidation";

function EditProfilePopup({ isOpen, onUpdateUser, isLoading, onClose }) {
    const {authUser} = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const validationName = useValidation();
    const validationDescription = useValidation();

    useEffect(() => {
        setName(authUser?.name || '');
        setDescription(authUser?.about || '');
        validationName.onReset();
        validationDescription.onReset();
    }, [isOpen, authUser]);

    function handleChangeName(inputForm) {
        validationName.checkValidate(inputForm);
        setName(inputForm.value);
    }

    function handleChangeDescription(inputForm) {
        validationDescription.checkValidate(inputForm);
        setDescription(inputForm.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }


    return (
        <PopupWithForm title="Редактировать профиль"
            name="profile-edit"
            textButton="Cохранить"
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleSubmit}
            validForm={validationName.isInputValid || validationDescription.isInputValid}
        >
            <input id="user-name"
                className={`popup__input popup__input_type_user-name  ${validationName.isInputError ? 'popup__input_type_error' : ''}`} name="name"
                value={name}
                disabled={isLoading}
                onChange={evt => handleChangeName(evt.target)}
                minLength="2"
                maxLength="40" required placeholder="Введите имя"/>
            <span className={`popup__error user-name-error ${validationName.isInputError ? 'popup__error_visible' : ''}`}>{validationName.validationMessage}</span>
            <input id="user-discription"
                className={`popup__input popup__input_type_user-discription  ${validationDescription.isInputError ? 'popup__input_type_error' : ''}`}
                value={description}
                disabled={isLoading}
                onChange={evt => handleChangeDescription(evt.target)}
                minLength="2"
                maxLength="200" required name="about" placeholder="Расскажите о себе"/>
            <span className={`popup__error user-discription-error ${validationDescription.isInputError ? 'popup__error_visible' : ''}`}>{validationDescription.validationMessage}</span>
        </PopupWithForm >
    )
}

export default EditProfilePopup;
