class MainApi {
  constructor(url) {
    this.url = url;
  }

  async getUserData() {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }

  async signUpUser(userData) {
    const res = await fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }

  async signInUser(userData) {
    const res = await fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }

  async signOutUser() {
    await fetch(`${this.url}/signout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async updateUser(newUserData) {
    const res = await fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      credentials: 'include',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUserData),
    });
    if (!res.ok) {
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    return res.json();
  }
}

const mainApi = new MainApi('http://localhost:3000');

export default mainApi;
