import axios from "axios";

import * as actionTypes from "./actionTypes";

/**
 * Delete Account
 */

export const deleteStart = () => {
  return {
    type: actionTypes.DELETE_START,
  };
};

export const deleteSuccess = (token, userId) => {
  return {
    type: actionTypes.DELETE_SUCCESS,
  };
};

export const deleteFail = (error) => {
  return {
    type: actionTypes.DELETE_FAIL,
    error: error,
  };
};

export const deleteAccount = (idToken, history) => {
  return (dispatch) => {
    dispatch(deleteStart());
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyBKigMT1nH8-JF5LG1ub5gAfflg_FCZwEo",
        {
          idToken: idToken,
        }
      )
      .then((res) => {
        dispatch(deleteSuccess());
        dispatch(logout());
        history.replace("/");
      })
      .catch((err) => dispatch(deleteFail(err)));
  };
};

/**
 * Update Account
 */

export const updateStart = () => {
  return {
    type: actionTypes.UPDATE_START,
  };
};

export const updateSuccess = (token, userId, email) => {
  return {
    type: actionTypes.UPDATE_SUCCESS,
    idToken: token,
    userId: userId,
    email: email,
  };
};

export const updateFail = (error) => {
  return {
    type: actionTypes.UPDATE_FAIL,
    error: error,
  };
};

export const update = (email, idToken, history) => {
  return (dispatch) => {
    dispatch(updateStart());
    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBKigMT1nH8-JF5LG1ub5gAfflg_FCZwEo",
        {
          idToken: idToken,
          email: email,
          returnSecureToken: true,
        }
      )
      .then((res) => {
        const expirationDate = new Date(
          new Date().getTime() + res.data.expiresIn * 1000
        );
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", res.data.localId);
        dispatch(
          updateSuccess(res.data.idToken, res.data.localId, res.data.email)
        );
        dispatch(checkAuthTimeout(res.data.expiresIn));
        history.replace("/");
      })
      .catch((err) => dispatch(updateFail(err.response.data.error)));
  };
};

/**
 * Authenticate Account
 */

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId, email) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    email: email,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBKigMT1nH8-JF5LG1ub5gAfflg_FCZwEo";
    if (!isSignup) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBKigMT1nH8-JF5LG1ub5gAfflg_FCZwEo";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.localId);
        dispatch(
          authSuccess(
            response.data.idToken,
            response.data.localId,
            response.data.email
          )
        );
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const email = localStorage.getItem("email");
        dispatch(authSuccess(token, userId, email));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
