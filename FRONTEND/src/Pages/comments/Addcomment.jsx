import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createComment } from "../../redux/apiCalls/commentApiCall";
import { toast } from "react-toastify";

const AddComment = ({ postId }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      return toast.error("Entrez un commentaire");
    }

    const newComment = {
      postId,
      text,
      user: user._id,
    };

    dispatch(createComment(newComment));

    setText("");
  };

  return (
    <form onSubmit={formSubmitHandler} className="seance-card">
      <input
        type="text"
        placeholder="Ajouter un commentaire"
        className="header__form-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="article__btn" type="submit">
        Commenter
      </button>
    </form>
  );
};

export default AddComment;
