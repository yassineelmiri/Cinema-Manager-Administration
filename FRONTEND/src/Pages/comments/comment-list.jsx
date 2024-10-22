import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchComments, updateComment, deleteComment } from "../../redux/apiCalls/commentApiCall";

const CommentList = ({ postId , userId}) => {
  const dispatch = useDispatch();
  const comments = useSelector((state) => state.comment.comments);


  useEffect(() => {
    dispatch(fetchComments());
  }, [dispatch]);

  const handleUpdate = (comment) => {
    const updatedText = prompt("Modifier le commentaire :", comment.text);
    if (updatedText) {
      dispatch(updateComment(comment._id, { text: updatedText, user: comment.user }));
    }
  };

  const handleDelete = (commentId) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce commentaire ?")) {
      dispatch(deleteComment(commentId));
    }
  };

  if (!comments || comments.length === 0) {
    return <div>Aucun commentaire trouvé</div>;
  }

  const filteredComments = comments.filter((comment) => comment.postId === postId);

  return (
    <div className="comment-section">
      {filteredComments.length === 0 ? (
        <p>Aucun commentaire pour ce post.</p>
      ) : (
        filteredComments.map((comment) => (
          <div key={comment._id} className="comments__item comments__item--quote">
            <div className="comments__autor">
              <img src="" alt="" className="comments__avatar" />
              <span className="comments__name">{comment.username}</span>
              <span className="comments__time">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="comments__text">{comment.text}</p>
        
            {/* Vérifier si l'utilisateur est le propriétaire du commentaire */}
            {userId === comment.user._id && (
              <div className="article__btns">
                <button className="article__btn" onClick={() => handleUpdate(comment)}>
                  Modifier
                </button>
                <button
                  className="article__btn article__btn--white"
                  onClick={() => handleDelete(comment._id)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ))
        
      )}
    </div>
  );
};

export default CommentList;
