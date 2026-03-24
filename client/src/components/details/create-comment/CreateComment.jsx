import { useParams } from "react-router";
import { useState } from "react";
import request from "../../../utils/request";

export default function CreateComment({ user }) {
  const { gameId } = useParams();
  const [comment, setComment] = useState("");
  const changeHandler = (e) => {
    setComment(e.target.value);
  };

  const submitHandler = async () => {
    await request("comments", "POST", {
      author: user.email,
      message: comment,
      gameId,
    });
  };

  // {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
  return (
    <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form" action={submitHandler}>
        <textarea
          onChange={changeHandler}
          value={comment}
          name="comment"
          placeholder="Comment......"
        ></textarea>
        <input
          disabled={!user}
          className="btn submit"
          type="submit"
          value="Add Comment"
        />
      </form>
    </article>
  );
}
