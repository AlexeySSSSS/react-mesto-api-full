import React, { useContext } from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const Main = ({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDeleteClick }) => {
    const currentUser = useContext(CurrentUserContext);
    const { name, about, avatar } = currentUser;

    return (
        <main className="main">
            <section className="profile">
                <button
                    className="profile__avatar-new"
                    title="Обновить аватар"
                    onClick={onEditAvatar}>
                    <img
                        className="profile__avatar"
                        src={avatar}
                        alt="Аватар"
                    />
                </button>
                <div className="profile__profile-info">
                    <div className="profile__block">
                        <h1 className="profile__name">{name}</h1>
                        <button
                            className="profile__edit-button"
                            title="Редактировать профиль"
                            onClick={onEditProfile}>
                        </button>
                    </div>
                    <h2 className="profile__description">{about}</h2>
                </div>
                <button
                    className="profile__add-button"
                    title="Создать новое изображение"
                    onClick={onAddPlace}>
                </button>
            </section>
            <section className="elements">
                {cards.map((card) => {
                    return (
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                            onCardLike={onCardLike}
                            onCardDeleteClick={onCardDeleteClick}
                        />
                    );
                })}
            </section>
        </main>
    );
};

export default Main;