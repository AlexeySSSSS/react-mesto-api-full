import React from "react";
import { Link, useLocation } from 'react-router-dom';

import Vector from '../images/Vector.svg';

const Header = ({ loggedIn, loginEmail, onSignOut }) => {
    const place = useLocation();
    return (
        <header className="header">
            <img
                className="header__logo"
                src={Vector}
                alt="Логотип место"
            />
            {place.pathname === '/sign-in' && (
                <Link to="/sign-up" className="header__link">
                    Регистрация
                </Link>
            )}
            {place.pathname === '/sign-up' && (
                <Link to="/sign-in" className="header__link">
                    Войти
                </Link>
            )}
            {loggedIn && (
                <nav className="header__nav">
                    <span className="header__span">{loginEmail}</span>
                    <button
                        className="header__exit"
                        onClick={() => onSignOut()}
                    >
                        Выйти
                    </button>
                </nav>
            )}
        </header>
    );
};

export default Header;