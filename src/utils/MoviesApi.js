/* eslint-disable*/
import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl;
  }

  async getMovies() {
    const res = await fetch(`${this._baseUrl}/beatfilm-movies`);

    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }
}

const moviesApi = new MoviesApi(MOVIES_URL);

export default moviesApi;
