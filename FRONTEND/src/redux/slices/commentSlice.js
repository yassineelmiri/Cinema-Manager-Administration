import { createSlice } from "@reduxjs/toolkit";
const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    },
    addComment: (state, action) => {
      state.comments.push(action.payload);
    },
    updateComment: (state, action) => {
      const index = state.comments.findIndex(
        (comment) => comment._id === action.payload._id
      );
      if (index !== -1) {
        state.comments[index] = action.payload;
      }
    },
    removeComment: (state, action) => {
      state.comments = state.comments.filter(
        (comment) => comment._id !== action.payload
      );
    },
  },
});


const commentReducer = commentSlice.reducer;
const commentActions = commentSlice.actions;

export { commentActions, commentReducer };
