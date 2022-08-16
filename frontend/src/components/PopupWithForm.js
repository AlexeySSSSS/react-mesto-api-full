import React from "react";

const PopupWithForm = (props) => {
    return (
        <section className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button
                    className="popup__close"
                    title="Закрыть"
                    onClick={props.onClose}
                ></button>
                <form
                    className="form popup__form"
                    name={`${props.form}`}
                    onSubmit={props.onSubmit}
                >
                    <h2 className="popup__profile">{props.title}</h2>
                    <div className="popup__block">{props.children}</div>
                    <button
                        className="popup__button"
                        type="submit"
                        title="Сохранить"
                        disabled={props.disabled}
                    >
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PopupWithForm;