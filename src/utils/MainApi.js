/* eslint-disable*/
import { MAIN_URL } from './constants';

class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }

  async getUserData() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

    return this._getResponseData(res);
  }

  async signUpUser(userData) {
    const res = await fetch(`${this._baseUrl}/signup`, {
      method: 'POST',
      headers: this._headers,

      body: JSON.stringify(userData),
    });

    return this._getResponseData(res);
  }

  async signInUser(userData) {
    const res = await fetch(`${this._baseUrl}/signin`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',

      body: JSON.stringify(userData),
    });

    return this._getResponseData(res);
  }

  async signOutUser() {
    await fetch(`${this._baseUrl}/signout`, {
      method: 'POST',
      headers: this._headers,

      credentials: 'include',
    });
  }

  async updateUser(newUserData) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',

      body: JSON.stringify(newUserData),
    });

    return this._getResponseData(res);
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
