import React, { useContext } from "react";
import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import FavoritesContext from "../../store/favorites-context";
import { Navigate } from "react-router-dom";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);

  const itemIsFavorite = favoritesCtx.itemIsFavorite(props.id);

  function toggleFavoritesStatusHandler() {
    if (itemIsFavorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        image: props.image,
        address: props.address,
        description: props.description,
      });
    }
  }

  const deleteHandler = (meetupData) => {
    fetch(
      `https://meetup-list-default-rtdb.firebaseio.com/meetups/${meetupData}`,
      {
        method: "delete",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res);
      })
      .then((err) => console.log(err));
  };

  return (
    <li className={classes.item}>
      <Card>
        <div>
          <img src={props.image} alt={props.title} className={classes.image} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
          <p>{props.description}</p>
        </div>
        <div className={classes.actions}>
          <button onClick={toggleFavoritesStatusHandler}>
            {itemIsFavorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          <button onClick={deleteHandler}>Remove Card</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
