import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Card = ({ card, onCardClick, onCardLike, onCardDeleteClick }) => {
    const currentUser = useContext(CurrentUserContext);
    const handleClick = () => {
        onCardClick(card);
    };
    const handleLikeClick = () => {
        onCardLike(card);
    };
    const handleDeleteClick = () => {
        onCardDeleteClick(card._id);
    };
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some((i) => i === currentUser._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked ? 'card__like_active' : ''}`
    );

    return (
        <article className="elements__element card">
            {isOwn && <button
                className="card__delete"
                title="Удалить"
                onClick={handleDeleteClick}
            />}
            <img
                className="card__item"
                title="Открыть в полном размере"
                src={card.link}
                alt={card.name}
                onClick={handleClick}
            />
            <div className="card__grid-block">
                <h2 className="card__text">{card.name}</h2>
                <div className="card__likes">
                    <span className="card__number">{card.likes.length}</span>
                    <button
                        className={cardLikeButtonClassName}
                        title="Нравиться"
                        onClick={handleLikeClick}
                    />
                </div>
            </div>
        </article>
    );
};

export default Card;