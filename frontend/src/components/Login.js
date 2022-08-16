import React from 'react';
import useValidity from "../validity/validity";

const Login = ({ onLogin }) => {
  const { valuesEntered, errors, handleChanges } = useValidity();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!valuesEntered.email || !valuesEntered.password) {
      return;
    }
    onLogin(valuesEntered);
  };

  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form
        className="login__form"
        onSubmit={handleSubmit}
      >
        <input
          className="login__input login__input_edit_email"
          value={valuesEntered.email || ''}
          onChange={handleChanges}
          name="email"
          id="email"
          autoComplete="email"
          type="email"
          placeholder="Email"
          required
        />
        <span className="login__error">{errors.email}</span>
        <input
          className="login__input login__input_edit_password"
          value={valuesEntered.password || ''}
          onChange={handleChanges}
          type="password"
          minLength="8"
          name="password"
          id="password"
          autoComplete="password"
          placeholder="Пароль"
          required />
        <span className="login__error">{errors.password}</span>
        <button className="login__button" type="submit">Войти</button>
      </form>
    </section>
  );
};

export default Login;