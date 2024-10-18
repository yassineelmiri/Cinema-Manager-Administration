import { salleActions } from "../slices/salleSlice";
import request from "../../utils/request";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Fetch all salles
export const fetchSalles = () => {
  return async (dispatch) => {
    dispatch(salleActions.setLoading());
    try {
      const { data } = await request.get("/api/salles");
      dispatch(salleActions.setSalles(data));
    } catch (error) {
      dispatch(
        salleActions.setError(
          error.response?.data?.message ||
            "Erreur lors de la récupération des salles"
        )
      );
    }
  };
};

// Get salles count
export const getSalleCount = () => {
  return async (dispatch) => {
    try {
      const { data } = await request.get("/api/salles/count");
      dispatch(salleActions.setSalleCount(data));
    } catch (error) {
      dispatch(
        salleActions.setError(
          error.response?.data?.message || "Erreur lors du comptage des salles"
        )
      );
    }
  };
};

// Create a salle
export const createSalle = (salleData) => {
  return async (dispatch) => {
    dispatch(salleActions.setLoading());
    try {
      const { data } = await request.post("/api/salles", salleData);
      dispatch(salleActions.addSalle(data));
    } catch (error) {
      dispatch(
        salleActions.setError(
          error.response?.data?.message ||
            "Erreur lors de la création de la salle"
        )
      );
      throw error;
    }
  };
};
// Delete a salle
export const deleteSalle = createAsyncThunk(
  "post/deletePost",
  async (salleId, { rejectWithValue }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      return rejectWithValue("User is not authenticated");
    }

    try {
      const response = request.delete(`/api/salles/${salleId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete the salle");
      }

      return salleId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
