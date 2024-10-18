import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  userInfo: null,
  updateLoading: false,
  updateError: null,
  updateSuccess: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserRequest: (state) => {
      state.updateLoading = true;
      state.updateError = null;
      state.updateSuccess = false;
    },
    updateUserSuccess: (state, action) => {
      state.updateLoading = false;
      state.updateSuccess = true;
      state.userInfo = action.payload; 
    },
    updateUserFail: (state, action) => {
      state.updateLoading = false;
      state.updateError = action.payload;
    },
    resetUpdateUserState: (state) => {
      state.updateLoading = false;
      state.updateError = null;
      state.updateSuccess = false;
    },
  },
});

export const {
  updateUserRequest,
  updateUserSuccess,
  updateUserFail,
  resetUpdateUserState,
} = userSlice.actions;
export default userSlice.reducer;