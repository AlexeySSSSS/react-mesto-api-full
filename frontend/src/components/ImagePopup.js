import React from "react";

const ImagePopup = ({ card, onClose }) => {
    return (
        <section className={`popup popup_big_image ${card.link ? "popup_opened" : ""}`}>
            <div className="popup__container popup__container_big_image">
                <button className="popup__close popup__close_big_image" title="Закрыть" onClick={onClose}></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <h2 className="popup__city">{card.name}</h2>
            </div>
        </section>
    );
};

export default ImagePopup;