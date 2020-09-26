import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { toggleFav } from "../../store/actions/movies";
// import "./MovieItem.scss";
import classes from "./MovieItem.module.css";
import Heart from "../UI/Heart/Heart";
import Star from "../UI/Star/Star";

const MovieItem = (props) => {
  const history = useHistory();
  const idToken = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const toggleFavHandler = () => {
    if (!idToken) {
      history.replace("signup");
    } else {
      dispatch(toggleFav(props.id));
    }
  };

  return (
    <div className="mb-3 col-lg-3 col-md-4 col-sm-6 col-12">
      <article className={`card ${classes["product-item"]}`}>
        <div className={`card-img ${classes["card-img"]}`}>
          <div className={classes.img}>
            <img className="card-img-top" src={props.cover} alt={props.title} />
          </div>
          <div className={classes.overlay}>
            <div
              className="d-flex flex-column justify-content-around align-items-center text-center"
              style={{ height: "100%" }}
            >
              <Star />
              <h4 className={classes.rating}>{props.rating} / 10</h4>{" "}
              <h4>{props.genres.slice(0, 2).join(" / ")}</h4>
            </div>
          </div>
        </div>

        <div className={`card-body ${classes["card-body"]}`}>
          <h5 className={`card-title ${classes["card-title"]}`}>
            {props.title}
          </h5>
          <div
            className={`card-text d-flex justify-content-between align-items-center ${classes["card-text"]}`}
          >
            <span className={classes.year}>{props.year}</span>
            <button className={classes.favorite} onClick={toggleFavHandler}>
              <Heart fill={!props.isFav ? "#dcdcdc" : "#ff2058"} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default MovieItem;
