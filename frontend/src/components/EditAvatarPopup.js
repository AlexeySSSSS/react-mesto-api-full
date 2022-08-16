import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

const EditAvatarPopup = ({ isOpen, onClose, onUpdateAvatar, onMessage }) => {
    const avatarLink = useRef();
    function handleSubmit(event) {
        event.preventDefault();
        onUpdateAvatar({
            link: avatarLink.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar_image"
            title="Обновить аватар"
            buttonText={onMessage ? "Сохранение..." : "Сохранить"}
            form="avatar"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input
                id="avatar-image"
                className="popup__input popup__input_avatar_job"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                required
                ref={avatarLink}
            />
            <span className="avatar-image-error popup__input-error"></span>
        </PopupWithForm>
    );
};

export default EditAvatarPopup;