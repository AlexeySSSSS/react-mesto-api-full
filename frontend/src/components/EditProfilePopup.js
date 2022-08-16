import React, { useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useValidity from "../validity/validity";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, onMessage }) => {
    const currentUser = useContext(CurrentUserContext);
    const { valuesEntered, errors, handleChanges, isFormValidaty, resetForm } = useValidity();

    const handleSubmit = (event) => {
        event.preventDefault();
        onUpdateUser({
            name: valuesEntered.name,
            info: valuesEntered.about
        });
    };

    useEffect(() => {
        currentUser ? resetForm(currentUser) : resetForm()
    }, [resetForm, isOpen, currentUser]);

    return (
        <PopupWithForm
            name="edit_profile"
            title="Редактировать профиль"
            buttonText={onMessage ? "Сохранение..." : "Сохранить"}
            form="form"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            disabled={!isFormValidaty}
        >
            <input
                id="edit-name"
                className="popup__input popup__input_edit_name"
                type="text"
                name="name"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                required
                value={valuesEntered.name || ''}
                onChange={handleChanges}
            />
            <span className="edit-name-error popup__input-error">{errors.name}</span>
            <input
                id="edit-job"
                className="popup__input popup__input_edit_job"
                type="text"
                name="about"
                placeholder="О себе"
                minLength="2"
                maxLength="200"
                required
                value={valuesEntered.about || ''}
                onChange={handleChanges}
            />
            <span className="edit-job-error popup__input-error">{errors.about}</span>
        </PopupWithForm>
    );
};

export default EditProfilePopup;