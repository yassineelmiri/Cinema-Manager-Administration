import {
  startReservation,
  reservationSuccess,
  reservationError,
} from "../slices/reservationSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";


// Fonction pour supprimer une réservation
export const deleteReservation = (reservationId) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo || !userInfo.token) {
    toast.error("User is not authenticated");
    return;
  }

  dispatch(startReservation());
  try {
    await request.delete(`/api/reservations/${reservationId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    // Récupérer les réservations après suppression
    const { data } = await request.get("/api/reservations", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(reservationSuccess(data));
    toast.success("Réservation supprimée avec succès.");
  } catch (error) {
    dispatch(
      reservationError(
        error.response?.data?.message || "Erreur lors de la suppression de la réservation."
      )
    );
    toast.error("Erreur lors de la suppression de la réservation.");
  }
};

export const makeReservation = (reservationData) => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // if (!userInfo || !userInfo.token) {
  //   toast.error("User is not authenticated");
  //   return;
  // }
  console.log("cd");

  dispatch(startReservation());
  try {
    const { data } = await request.post("/api/reservations", reservationData, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    return data;
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Erreur lors de la réservation."
    );
  }
};

export const fetchReservations = () => async (dispatch) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (!userInfo || !userInfo.token) {
    toast.error("User is not authenticated");
    return;
  }

  dispatch(startReservation());
  try {
    const { data } = await request.get("/api/reservations", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch(reservationSuccess(data));
  } catch (error) {
    dispatch(
      reservationError(
        error.response?.data?.message ||
          "Erreur lors de la récupération des réservations."
      )
    );
  }
};
