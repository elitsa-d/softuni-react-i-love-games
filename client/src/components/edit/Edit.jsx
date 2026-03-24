import { useState, useEffect } from "react";
import { useParams } from "react-router";
import request from "../../utils/request";

const initialValues = {
  title: "",
  genre: "",
  players: "",
  date: "",
  imageUrl: "",
  summary: "",
};

export default function Edit() {
  const { gameId } = useParams();
  const [values, setValues] = useState(initialValues);

  const changeHandler = (e) => {
    setValues((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    request(`games/${gameId}`)
      .then((result) => {
        setValues(result);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [gameId]);

  const editGameHandler = async (formData) => {
    const gameData = Object.fromEntries(formData);
    await request(`games/${gameId}`);
  };

  return (
    <section id="edit-page">
      <form id="add-new-game" action={editGameHandler}>
        <div className="container">
          <h1>Edit Game</h1>

          <div className="form-group-half">
            <label htmlFor="title">Game Name:</label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={changeHandler}
              value={values.title}
              placeholder="Enter game title..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
              onChange={changeHandler}
              value={values.genre}
              placeholder="Enter game genre..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="players">Active Players:</label>
            <input
              type="number"
              id="players"
              name="players"
              min="0"
              onChange={changeHandler}
              value={values.players}
              placeholder="0"
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="date">Release Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              onChange={changeHandler}
              value={values.date}
            />
          </div>

          <div className="form-group-full">
            <label htmlFor="imageUrl">Image URL:</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              onChange={changeHandler}
              value={values.imageUrl}
              placeholder="Enter image URL..."
            />
          </div>

          <div className="form-group-full">
            <label htmlFor="summary">Summary:</label>
            <textarea
              name="summary"
              id="summary"
              rows="5"
              onChange={changeHandler}
              value={values.summary}
              placeholder="Write a brief summary..."
            ></textarea>
          </div>

          <input className="btn submit" type="submit" value="EDIT GAME" />
        </div>
      </form>
    </section>
  );
}
