import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ isOpen, onConfirm, isLoading, onClose}) {

    function handleSubmit(e) {
        e.preventDefault();
        onConfirm();
    }

    return (
        <PopupWithForm title="Вы уверены?"
            name="confirm"
            textButton="Да"
            isOpen={isOpen}
            isLoading={isLoading}
            onClose={onClose}
            onSubmit={handleSubmit}
            validForm
        />
    )
} 

export default ConfirmPopup;