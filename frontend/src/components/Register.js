import React from "react";
import { Link } from 'react-router-dom';
import useValidity from "../validity/validity";

const Register = ({ onRegister }) => {
    const { valuesEntered, errors, handleChanges } = useValidity();

    const handleSubmit = (event) => {
        event.preventDefault();
        onRegister(valuesEntered);
    };

    return (
        <>
            <section className="login">
                <h2 className="login__title">Регистрация</h2>
                <form
                    className="login__form"
                    onSubmit={handleSubmit}
                >
                    <input
                        className="login__input login__input_edit_email"
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        autoComplete="email"
                        value={valuesEntered.email || ''}
                        onChange={handleChanges}
                        required
                    />
                    <span className="login__error">{errors.email}</span>
                    <input
                        className="login__input login__input_edit_password"
                        id="password"
                        name="password"
                        type="password"
                        min="8"
                        placeholder="Пароль"
                        autoComplete="password"
                        value={valuesEntered.password || ''}
                        onChange={handleChanges}
                        required
                    />
                    <span className="login__error">{errors.password}</span>
                    <button
                        className="login__button"
                        type="submit"
                    >
                        Зарегистрироваться
                    </button>
                </form>
                <Link to="/sign-in" className="login__hint">
                    Уже зарегистрированы? Войти
                </Link>
            </section>
        </>
    );
};

export default Register;