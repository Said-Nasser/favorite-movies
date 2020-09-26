import React, { useMemo, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { update, deleteAccount } from "../../store/actions";
import Input from "../../components/UI/Input/Input";
import classes from "./Profile.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";

const profileReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, value: action.payload };
    case "SET_VALID":
      return { ...state, valid: action.payload };
    case "SET_TOUCHED":
      return { ...state, touched: action.payload };

    default:
      return state;
  }
};

const Profile = () => {
  const email = useSelector((state) => state.auth.email);

  const initialState = useMemo(
    () => ({
      elementType: "input",
      name: "email",
      label: "Email",
      elementConfig: {
        type: "email",
        placeholder: "Mail Address",
      },
      value: email,
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    }),
    [email]
  );
  const [state, dispatchReact] = useReducer(profileReducer, initialState);
  const idToken = useSelector((state) => state.auth.token);
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.token !== null);

  const dispatchRedux = useDispatch();

  const history = useHistory();

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const inputChangedHandler = (event) => {
    dispatchReact({ type: "SET_VALUE", payload: event.target.value });
    dispatchReact({ type: "SET_TOUCHED", payload: true });
    dispatchReact({
      type: "SET_VALID",
      payload: checkValidity(event.target.value, state.validation),
    });
  };

  const deleteAccountHandler = () => {
    if (idToken) {
      dispatchRedux(deleteAccount(idToken, history));
    }
  };
  const saveChangesHandler = (event) => {
    event.preventDefault();
    if (idToken) {
      dispatchRedux(update(state.value, idToken, history));
    }
  };

  let form = (
    <form onSubmit={saveChangesHandler}>
      <Input
        elementType={state.elementType}
        elementConfig={state.elementConfig}
        value={state.value}
        label={state.label}
        invalid={!state.valid}
        shouldValidate={state.validation}
        touched={state.touched}
        changed={(event) => inputChangedHandler(event)}
      />
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success"
          type="submit"
          disabled={!state.valid}
        >
          save
        </button>
        <button className="btn btn-danger" onClick={deleteAccountHandler}>
          Delete Account
        </button>
      </div>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  let authRedirect = null;
  if (!isAuthenticated) {
    authRedirect = <Redirect to="/" />;
  }
  return (
    <div className={classes.Profile}>
      {authRedirect}
      <h1>Profile Info</h1>
      <hr className="mb-5" />
      {form}
    </div>
  );
};

export default Profile;
