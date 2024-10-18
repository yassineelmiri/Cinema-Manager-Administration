import request from "../../utils/request";
import { setSeances, setError } from "../slices/seanceSlice";

// Fetch Seances by Film ID
export const fetchSeancesByFilmId = (filmId) => async (dispatch) => {
  try {
    const { data } = await request.get(`/api/seances`);
    dispatch(setSeances(data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

// Create Seance
export const createSeance = (seanceData) => async (dispatch) => {
  try {
    const { data } = await request.post("/api/seances", seanceData);
    dispatch(setSeances(data));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          "Erreur lors de la création de la séance"
      )
    );
    throw error;
  }
};

// Delete Seance (nouvelle fonction)
export const deleteSeance = (seanceId) => async (dispatch) => {
  try {
    await request.delete(`/api/seances/${seanceId}`);
    dispatch(fetchSeancesByFilmId());
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
          "Erreur lors de la suppression de la séance"
      )
    );
    throw error;
  }
};
