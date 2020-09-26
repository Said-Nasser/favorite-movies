import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { logout } from "../../store/actions";
import classes from './Navigation.module.css';


const Navigation = () => {
  const isAuthenticated = useSelector((state) => state.auth.token !== null);
  const dispatch = useDispatch();

  return (
    <header>
      <nav className={classes.Nav}>
        <div className="container">
          <div className="row justify-content-between">
            <ul className="nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <NavLink to="/" exact className={`nav-link ${classes.Link}`}>
                  All Movies
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to={isAuthenticated?"/favorites" : "/signup"} className={`nav-link ${classes.Link}`}>
                  Favorites
                </NavLink>
              </li>
            </ul>
            <ul className="nav ml-auto mt-2 mt-lg-0">
              {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link
                      to="/"
                      className={`nav-link ${classes.Link}`}
                      onClick={() => dispatch(logout())}
                    >
                      Logout
                    </Link>
                  </li>
                  <li className="nav-item ml-2">
                    <NavLink to="/profile" className={`nav-link ${classes.Link}`} exact>
                      Profile
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink to="/login" className={`nav-link ${classes.Link}`}>
                      Login
                    </NavLink>
                  </li>
                  <span className={`nav-link ${classes.Link}`} style={{paddingLeft: 0, paddingRight: 0}}>/</span>
                  <li className="nav-item">
                    <NavLink to="/signup" className={`nav-link ${classes.Link}`}>
                      Sign up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
