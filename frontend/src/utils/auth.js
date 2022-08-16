import { responseAnalysis } from './response';

export const BASE_URL = 'https://api.alexeysimakin.mesto.nomoredomains.sbs';

const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export const userRegister = ({ email, password }) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: 'include',
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    }).then((res) => responseAnalysis(res));
};

export const loginAuthorize = ({ email, password }) => {
    return fetch(`${BASE_URL}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers,
        body: JSON.stringify({ email, password }),
    }).then((res) => responseAnalysis(res));
};

export const getToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            ...headers,
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => responseAnalysis(res));
};