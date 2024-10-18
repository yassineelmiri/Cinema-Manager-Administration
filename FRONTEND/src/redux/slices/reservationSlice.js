import { createSlice } from "@reduxjs/toolkit";
const reservationSlice = createSlice({
  name: "reservation",
  initialState: {
    reservations: [],
    loading: false,
    error: null,
  },
  reducers: {
    startReservation: (state) => {
      state.loading = true;
      state.error = null;
    },
    reservationSuccess: (state, action) => {
      state.loading = false;
      state.reservations = action.payload;
    },
    reservationError: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { startReservation, reservationSuccess, reservationError } =
  reservationSlice.actions;

export default reservationSlice.reducer;
