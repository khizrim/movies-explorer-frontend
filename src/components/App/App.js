import React from 'react';

import { Route, Switch, useHistory } from 'react-router';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Header from '../Header/Header';
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
  const [isError, setIsError] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesList, setMoviesList] = React.useState([]);
  const [savedMoviesList, setSavedMoviesList] = React.useState([]);

  const [infoMessage, setInfoMessage] = React.useState({
    isShown: false,
    type: '',
    code: 200,
  });

  const getInitialMovies = () => {
    setIsLoading(true);

    const localMovies = localStorage.getItem('movies');

    (async () => {
      try {
        if (localMovies) {
          setMoviesList(JSON.parse(localMovies));
        } else {
          const movies = await moviesApi.getMovies();
          localStorage.setItem('movies', JSON.stringify(movies));
          setMoviesList(movies);
        }
      } catch (err) {
        setIsError(true);
        setMoviesList([]);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  const getSavedMovies = () => {
    setIsLoading(true);

    (async () => {
      try {
        const res = await mainApi.getSavedMovies();
        if (res) {
          setSavedMoviesList(res.data);
        }
      } catch (err) {
        setIsError(true);
        setSavedMoviesList([]);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  const handleMovieSave = async (movieData) => {
    const movie = await mainApi.saveMovie(movieData);
    setSavedMoviesList([movie.data, ...savedMoviesList]);
  };

  const handleMovieDelete = async (movieId) => {
    await mainApi.deleteMovie(movieId);

    setSavedMoviesList(
      savedMoviesList.filter((movie) => movie._id !== movieId),
    );
  };

  const handleSignUp = async (name, email, password) => {
    try {
      await mainApi.signUpUser({
        name,
        email,
        password,
      });
    } catch ({ status }) {
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        code: status,
        type: 'signup',
      });
    }
  };

  const handleSignIn = async (email, password) => {
    try {
      const user = await mainApi.signInUser({
        email,
        password,
      });

      setCurrentUser(user.data);
      setIsLoggedIn(true);

      history.push('/movies');
    } catch ({ status }) {
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        code: status,
        type: 'signin',
      });
    }
  };

  const handleUserUpdate = async (name, email) => {
    try {
      const user = await mainApi.updateUser({
        name,
        email,
      });
      setCurrentUser(user.data);
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        code: 201,
        type: 'update',
      });
    } catch ({ status }) {
      setInfoMessage({
        ...infoMessage,
        isShown: true,
        code: status,
        type: 'update',
      });
    }
  };

  const handleSignOut = async () => {
    await mainApi.signOutUser();
    setIsLoggedIn(false);
    localStorage.clear();
    history.push('/');
  };

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

  React.useEffect(() => {
    if(isLoggedIn) {
      getSavedMovies();
    }
  }, [isLoggedIn]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Route exact path={['/movies', '/saved-movies', '/profile', '/']}>
            <Header isLoggedIn={isLoggedIn} />
          </Route>
          <Switch>
            <Route exact path="/">
              <Main />
            </Route>
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              isLoggedIn={isLoggedIn}
              isChecking={isChecking}
              isLoading={isLoading}
              isError={isError}
              movies={moviesList}
              savedMovies={savedMoviesList}
              getMovies={getInitialMovies}
              onMovieSave={handleMovieSave}
              onMovieDelete={handleMovieDelete}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              component={SavedMovies}
              isLoggedIn={isLoggedIn}
              isChecking={isChecking}
              isLoading={isLoading}
              isError={isError}
              movies={savedMoviesList}
              savedMovies={savedMoviesList}
              getMovies={getSavedMovies}
              onMovieSave={handleMovieSave}
              onMovieDelete={handleMovieDelete}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              isLoggedIn={isLoggedIn}
              isChecking={isChecking}
              onUserUpdate={handleUserUpdate}
              onSignOut={handleSignOut}
              infoMessage={infoMessage}
            />
            <Route path="/signup">
              <Register
                infoMessage={infoMessage}
                onSubmit={handleSignUp}
              />
            </Route>
            <Route path="/signin">
              <Login
                infoMessage={infoMessage}
                onSubmit={handleSignIn}
              />
            </Route>
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
