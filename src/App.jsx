import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import * as actions from "./store/actions/index";

import Navigation from "./components/Nav/Navigation";
import Spinner from "./components/UI/Spinner/Spinner";

const MoviesPage = lazy(() => import("./containers/Movies/Movies"));
const FavoritesPage = lazy(() => import("./containers/Favorites/Favorites"));
const Auth = lazy(() => import("./containers/Auth/Auth"));
const Profile = lazy(() => import("./containers/Profile/Profile"));

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);
  return (
    <React.Fragment>
      <Navigation />
      <main>
        <Suspense fallback={<Spinner />}>
          <Route path="/" component={MoviesPage} exact />
          <Route path="/favorites" component={FavoritesPage} />
          <Route path="/profile" component={Profile} />
          <Route path="/login" component={Auth} />
          <Route path="/signup" component={Auth} />
        </Suspense>
      </main>
    </React.Fragment>
  );
};

export default App;
