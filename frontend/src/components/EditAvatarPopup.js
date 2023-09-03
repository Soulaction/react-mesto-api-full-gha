import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import { useValidation } from "../hooks/useValidation";

function EditAvatarPopup({ isOpen, onUpdateAvatar, isLoading, onClose }) {
    const {authUser} = useContext(CurrentUserContext);
    const [avatar, setAvatar] = useState('');
    const validationAvatar = useValidation();

    useEffect(() => {
        validationAvatar.onReset();
    }, [isOpen]);

    function handleAvatar(inputForm) {
        validationAvatar.checkValidate(inputForm);
        setAvatar(inputForm.value);
    }

    useEffect(() => {
        setAvatar(authUser?.avatar || '');
    }, [isOpen, authUser])

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar
        });
    }

    return (
        <PopupWithForm title="Обновить аватар"
            name="update-avatar"
            textButton="Cохранить"
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleSubmit}
            validForm={validationAvatar.isInputValid}
        >
            <input id="url-img-avatar"
                className={`popup__input popup__input_type_link-avatar ${validationAvatar.isInputError ? 'popup__input_type_error' : ''}`}
                disabled={isLoading}
                onChange={(evt) => handleAvatar(evt.target)}
                value={avatar}
                name="avatar" type="url" required
                placeholder="Ссылка на картинку"/>
            <span className={`popup__error url-img-avatar-error ${validationAvatar.isInputError ? 'popup__error_visible' : ''}`}>{validationAvatar.validationMessage}</span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
