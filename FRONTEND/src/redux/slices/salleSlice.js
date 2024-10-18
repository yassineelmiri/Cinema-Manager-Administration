import { createSlice } from "@reduxjs/toolkit";

const salleSlice = createSlice({
  name: "salle",
  initialState: {
    salles: [],           
    salleCount: 0,        
    loading: false,       
    error: null,       
  },
  reducers: {
    setSalles: (state, action) => {
      state.salles = action.payload;
      state.loading = false;
    },
    addSalle: (state, action) => {
      state.salles.push(action.payload); // Ajouter la nouvelle salle directement
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setSalleCount: (state, action) => {
      state.salleCount = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const salleActions = salleSlice.actions;
export default salleSlice.reducer;
