import { useState } from "react";

export const useValidation = () => {
    const [valid, setValid] = useState({isInputValid: false, validationMessage: '', isInputError: false});

    const checkValidate = (inputForm) => {
        setValid({isInputValid: inputForm.validity.valid, validationMessage: inputForm.validationMessage, isInputError: !inputForm.validity.valid});
    }

    const onReset = () => {
        setValid({isInputValid: false, validationMessage: '', isInputError: false});
    }

    return {
        checkValidate,
        onReset,
        ...valid
    }
}