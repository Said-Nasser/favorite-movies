import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  email: null,
  error: null,
  loading: false,
  authRedirectPath: "/",
};

/**
 * Delete Account
 */

const deleteStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const deleteSuccess = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    error: null,
    loading: false,
  });
};

const deleteFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

/**
 * Update Account
 */

const updateStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const updateSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    email: action.email,
    error: null,
    loading: false,
  });
};

const updateFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

/**
 * Authenticate Account
 */

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    email: action.email,
    error: null,
    loading: false,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};

const authLogout = (state, action) => {
  return updateObject(state, { token: null, userId: null, email: null });
};

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_START:
      return deleteStart(state, action);
    case actionTypes.DELETE_SUCCESS:
      return deleteSuccess(state, action);
    case actionTypes.DELETE_FAIL:
      return deleteFail(state, action);
    case actionTypes.UPDATE_START:
      return updateStart(state, action);
    case actionTypes.UPDATE_SUCCESS:
      return updateSuccess(state, action);
    case actionTypes.UPDATE_FAIL:
      return updateFail(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
};

export default reducer;
