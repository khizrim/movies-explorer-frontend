import React from 'react';

import { Route, Switch, useHistory } from 'react-router';

import CurrentUserContext from '../../contexts/CurrentUserContext';

import Main from '../Main/Main';
import Login from '../Login/Login';
import Register from '../Register/Register';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import NotFound from '../NotFound/NotFound';

import mainApi from '../../utils/MainApi';
import moviesApi from '../../utils/MoviesApi';

import './App.css';

function App() {
  const history = useHistory();

  const [currentUser, setCurrentUser] = React.useState({});
  const [isChecking, setIsChecking] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
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
        // eslint-disable-next-line no-console
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }

  function handleSignUp(name, email, password) {
    mainApi.signUpUser({ name, email, password });
  }

  function handleSignIn(email, password) {
    mainApi.signInUser({ email, password }).then((res) => {
      setCurrentUser(res.data);
      setIsLoggedIn(true);
      history.push('/movies');
    });
  }

  function handleUpdateUser(name, email) {
    mainApi.updateUser({ name, email }).then((res) => {
      setCurrentUser(res.data);
    });
  }

  function handleSignOut() {
    mainApi.signOutUser().then(() => {
      setIsLoggedIn(false);
      history.push('/');
    });
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Switch>
            <Route exact path="/">
              <Main isLoggedIn={isLoggedIn} />
            </Route>
            <Route exact path="/signup">
              <Register onSubmit={handleSignUp} />
            </Route>
            <Route exact path="/signin">
              <Login onSubmit={handleSignIn} />
            </Route>
            <ProtectedRoute
              path="/movies"
              isChecking={isChecking}
              isLoggedIn={isLoggedIn}
              component={Movies}
              isLoading={isLoading}
              movies={moviesList}
              getMovies={getInitialMovies}
            />
            <ProtectedRoute
              path="/saved-movies"
              isChecking={isChecking}
              isLoggedIn={isLoggedIn}
              component={SavedMovies}
              isLoading={isLoading}
              movies={moviesList}
              getMovies={getInitialMovies}
            />
            <ProtectedRoute
              path="/profile"
              isChecking={isChecking}
              isLoggedIn={isLoggedIn}
              component={Profile}
              onUserUpdate={handleUpdateUser}
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
