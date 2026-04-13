import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import request from "../../utils/request";

export default function GameCreate() {
  const navigate = useNavigate();
  const [imageUpload, setImageUpload] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    };
  }, [imageUpload]);

  const createGameHandler = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { image, ...data } = Object.fromEntries(formData);

    if (imageUpload) {
      //TODO updaload image
    } else {
      data.imageUrl = image;
    }
    data.players = Number(data.players);
    data._createdOn = Date.now();

    await request("games", "POST", data);

    navigate("/games");
  };

  const imageUploadClickHandler = () => {
    setImageUpload((state) => !state);
  };

  const imageChangeHandler = (e) => {
    const image = e.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    setImagePreview(imageUrl);
  };

  return (
    <section id="add-page">
      <form id="add-new-game" onSubmit={createGameHandler}>
        <div className="container">
          <h1>Add New Game</h1>

          <div className="form-group-half">
            <label htmlFor="gameName">Game Name:</label>
            <input
              type="text"
              id="gameName"
              name="title"
              placeholder="Enter game title..."
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="genre">Genre:</label>
            <input
              type="text"
              id="genre"
              name="genre"
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
              placeholder="0"
            />
          </div>

          <div className="form-group-half">
            <label htmlFor="releaseDate">Release Date:</label>
            <input type="date" id="releaseDate" name="date" />
          </div>

          <div className="form-group-full">
            <label htmlFor="image">
              {imageUpload ? "Image upload:" : "Image URL:"}
            </label>
            <button
              type="button"
              className="details-button"
              onClick={imageUploadClickHandler}
            >
              {imageUpload ? "Image URL" : "Image Upload"}
            </button>
            {imageUpload ? (
              <input
                type="file"
                id="imageFile"
                name="image"
                placeholder="Upload file"
                onChange={imageChangeHandler}
              />
            ) : (
              <input
                type="text"
                id="imageUrl"
                name="image"
                placeholder="Enter image URL..."
              />
            )}

            {imagePreview && <img src={imagePreview} alt="preview image" />}
          </div>

          <div className="form-group-full">
            <label htmlFor="summary">Summary:</label>
            <textarea
              name="summary"
              id="summary"
              rows="5"
              placeholder="Write a brief summary..."
            ></textarea>
          </div>

          <input className="btn submit" type="submit" value="ADD GAME" />
        </div>
      </form>
    </section>
  );
}
