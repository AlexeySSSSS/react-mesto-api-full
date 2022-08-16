import React from "react";
import Success from '../images/Success.svg';
import Unsuccess from '../images/Unsuccess.svg';

const InfoTooltip = ({ isOpen, onClose, passedSuccess }) => {
    return (
        <section className={`popup popup_info_tooltip ${isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_info_tooltip">
                <button
                    type="button"
                    className="popup__close"
                    onClick={onClose}
                />
                <img
                    src={passedSuccess ? Success : Unsuccess}
                    alt={
                        passedSuccess ? 'Успешная регистрация' : 'Регистрация не получилась'
                    }
                    className="popup__icon"
                />
                <h3 className="popup__title">
                    {passedSuccess
                        ? 'Вы успешно зарегистрировались!'
                        : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h3>
            </div>
        </section>
    );
};

export default InfoTooltip;