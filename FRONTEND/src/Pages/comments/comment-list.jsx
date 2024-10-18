import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ postId }) => {
  // Ajout du paramètre postId
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);

  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  if (!comments || comments.length === 0) {
    return <div>Aucun commentaire trouvé</div>;
  }

  // Filtrer les commentaires par postId
  const filteredComments = comments.filter(
    (comment) => comment.postId === postId
  );

  return (
    <div className="comment-section">
      <h1 className="article__trailer">Comments :</h1>

      {filteredComments.length === 0 ? (
        <p>Aucun commentaire pour ce post.</p>
      ) : (
        filteredComments.map((comment) => (
          <div
            key={comment._id}
            className="comments__item comments__item--quote"
          >
            <div className="comments__autor">
              <img src="" alt="" className="comments__avatar" />
              <span className="comments__name">{comment.username}</span>
              <span className="comments__time">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="comments__text">{comment.text}</p>
            <div className="comment-section__actions">
              <i className="categories__item">Modifier</i>
              <i className="categories__item">Supprimer</i>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default CommentList;
