import { commentActions } from "../slices/commentSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";
import { setLoading } from "../slices/postSlice";

// Créer un commentaire
export function createComment(newComment) {
  return async (dispatch, getState) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }
    try {
      const { data } = await request.post("/api/comments", newComment, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch(commentActions.addComment(data));
      toast.success("Commentaire ajouté");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du commentaire");
    }
  };
}

// Récupérer les commentaires
export function fetchComments() {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/comments");
      dispatch(commentActions.setComments(data));
    } catch (error) {
      toast.error("Erreur lors de la récupération des commentaires");
    }
  };
}
