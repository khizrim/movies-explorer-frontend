import { MOVIES_URL } from './constants';

class MoviesApi {
  constructor(url) {
    this.url = url;
  }

  async getMovies() {
    const res = await fetch(this.url);

    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }
}

const moviesApi = new MoviesApi(`${MOVIES_URL}/beatfilm-movies`);

export default moviesApi;
