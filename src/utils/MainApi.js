/* eslint-disable no-underscore-dangle */
import { MAIN_URL, MOVIES_URL } from './constants';

class MainApi {
  constructor({ baseUrl, moviesUrl, headers }) {
    this._baseUrl = baseUrl;
    this._moviesUrl = moviesUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    this._res = res;

    if (!this._res.ok) {
      return Promise.reject(this._res);
    }

    return this._res.json();
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

  async getSavedMovies() {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'GET',
      headers: this._headers,
      credentials: 'include',
    });

    return this._getResponseData(res);
  }

  async saveMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  }) {
    const res = await fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',

      body: JSON.stringify({
        country: country || 'no-country',
        director,
        duration,
        year,
        description,
        image: `${this._moviesUrl}${image.url}`,
        trailer: trailerLink,
        nameRU: nameRU || 'no name',
        nameEN: nameEN || 'no name',
        thumbnail: `${this._moviesUrl}${image.formats.thumbnail.url}`,
        movieId: id,
      }),
    });

    return this._getResponseData(res);
  }

  async deleteMovie(movieId) {
    const res = await fetch(`${this._baseUrl}/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    });

    return this._getResponseData(res);
  }
}

const mainApi = new MainApi({
  baseUrl: MAIN_URL,
  moviesUrl: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainApi;
