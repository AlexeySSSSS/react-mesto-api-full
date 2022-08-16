import React, { useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import useValidity from "../validity/validity";

const AddPlacePopup = ({ isOpen, onClose, onAddPlace, onMessage }) => {
    const { valuesEntered, errors, handleChanges, isFormValidaty, resetForm } = useValidity();
    const handleSubmit = (event) => {
        event.preventDefault();
        onAddPlace({
            text: valuesEntered.text,
            url: valuesEntered.url
        });
    };

    useEffect(() => {
        resetForm()
    }, [resetForm, isOpen])

    return (
        <PopupWithForm
            name="image_card"
            title="Новое место"
            buttonText={onMessage ? "Сохранение..." : "Создать"}
            form="image"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            disabled={!isFormValidaty}
        >
            <input
                id="image-name"
                className="popup__input popup__input_image_name"
                type="text"
                name="text"
                placeholder="Название"
                minLength="2"
                maxLength="30"
                required
                onChange={handleChanges}
                value={valuesEntered.text || ''}
            />
            <span className="image-name-error popup__input-error">{errors.text}</span>
            <input id="image-job"
                className="popup__input popup__input_image_job"
                type="url"
                name="url"
                placeholder="Ссылка на картинку"
                required
                onChange={handleChanges}
                value={valuesEntered.url || ''}
            />
            <span className="image-job-error popup__input-error">{errors.url}</span>
        </PopupWithForm>
    );
};

export default AddPlacePopup;