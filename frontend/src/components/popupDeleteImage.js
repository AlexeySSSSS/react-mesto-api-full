import React from "react";

const PopupDeleteImage = ({ isOpen, onClose, onMessage, card, handleSubmit, }) => {
    const handleDeleteImage = (event) => {
        event.preventDefault();
        handleSubmit(card);
    };

    return (
        <section className={`popup popup_delete_image ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_delete_image">
                <button
                    className="popup__close popup__close_delete_image"
                    title="Закрыть"
                    onClick={onClose}
                >
                </button>
                <form
                    className="popup__form popup__form_delete_image"
                    name="avatar"
                    onSubmit={handleDeleteImage}
                >
                    <h2 className="popup__profile popup__profile_delete_image">Вы уверены?</h2>
                    <button
                        className="popup__button popup__button_delete_image"
                        type="submit"
                        title="Подтвердить"
                    >
                        {onMessage ? "Сохранение..." : "Да"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PopupDeleteImage;