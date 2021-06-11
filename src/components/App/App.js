import React from 'react';

import { Route, Switch, useHistory } from 'react-router';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import './App.css';

function App() {
  const history = useHistory();

  const [isChecking, setIsChecking] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesList, setMoviesList] = React.useState([]);

  function getInitialMovies() {
    setIsLoading(true);

    const localMovies = localStorage.getItem('movies');

    (async () => {
      try {
        if (localMovies) {
          await setMoviesList(JSON.parse(localMovies));
        } else {
          const res = await moviesApi.getMovies();
          localStorage.setItem('movies', JSON.stringify(res));
          setMoviesList(res);
        }
      } catch (err) {
        setMoviesList([]);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  React.useEffect(() => {
    setIsChecking(true);
    (async () => {
      try {
        const res = await mainApi.getUserData();
        if (res) {
          setIsLoggedIn(true);
          setCurrentUser(res.data);
        }
      } catch (err) {
        setIsLoggedIn(false);
      } finally {
        setIsChecking(false);
      }
    })();
  }, []);

  const handleSignUp = async (name, email, password) => {
    await mainApi.signUpUser({
      name,
      email,
      password,
    });
  };

  const handleSignIn = async (email, password) => {
    const user = await mainApi.signInUser({
      email,
      password,
    });

    setCurrentUser(user.data);
    setIsLoggedIn(true);

    history.push('/movies');
  };

  const handleUserUpdate = async (name, email) => {
    const user = await mainApi.updateUser({
      name,
      email,
    });

    setCurrentUser(user.data);
  };

  const handleSignOut = async () => {
    await mainApi.signOutUser();
    setIsLoggedIn(false);
    localStorage.clear();
    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Switch>
            <Route exact path="/">
              <Main
                isLoggedIn={isLoggedIn}
              />
            </Route>
            <Route exact path="/signup">
              <Register
                onSubmit={handleSignUp}
              />
            </Route>
            <Route exact path="/signin">
              <Login
                onSubmit={handleSignIn}
              />
            </Route>
            <ProtectedRoute
              path="/movies"
              component={Movies}
              isChecking={isChecking}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              movies={moviesList}
              getMovies={getInitialMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              component={SavedMovies}
              isChecking={isChecking}
              isLoggedIn={isLoggedIn}
              isLoading={isLoading}
              movies={moviesList}
              getMovies={getInitialMovies}
            />
            <ProtectedRoute
              path="/profile"
              component={Profile}
              isChecking={isChecking}
              isLoggedIn={isLoggedIn}
              onUserUpdate={handleUserUpdate}
              onSignOut={handleSignOut}
            />
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
