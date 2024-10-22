import { commentActions } from "../slices/commentSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";


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

// Mettre à jour un commentaire
export function updateComment(id, updatedComment) {
  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }

    // Regroupez les données à envoyer dans le corps de la requête
    const updateData = {
      user: updatedComment.user._id,
      text: updatedComment.text
    };

    try {
      // Envoyez l'objet avec les données au lieu d'arguments séparés
      const { data } = await request.put(`/api/comments/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      // Mettez à jour l'état avec les nouvelles données
      dispatch(commentActions.updateComment(data));
      toast.success("Commentaire modifié");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la modification du commentaire");
    }
  };
}



// Supprimer un commentaire
export function deleteComment(id) {

  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }
    try {
      await request.delete(`/api/comments/${id}`,{
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      dispatch(commentActions.removeComment(id));
      toast.success("Commentaire supprimé");
    } catch (error) {
      toast.error("Erreur lors de la suppression du commentaire");
    }
  };
}

