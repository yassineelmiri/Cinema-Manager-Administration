import { createSlice } from "@reduxjs/toolkit";

const seanceSlice = createSlice({
  name: "seance",
  initialState: {
    seances: [],
    error: null,
  },
  reducers: {
    setSeances(state, action) {
      state.seances = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setSeances, setError } = seanceSlice.actions;
export default seanceSlice.reducer;
