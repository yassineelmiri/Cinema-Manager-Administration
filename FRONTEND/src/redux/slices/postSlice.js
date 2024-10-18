import { createSlice } from "@reduxjs/toolkit";
import AddComment from "../../Pages/comments/Addcomment";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],
    selectedPost: null,
    loading: false,
    error: null,
    postsCount: 0,
    isFetching: false,
  },
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload || true;
      state.error = null;
    },
    setSelectedPost: (state, action) => {
      state.selectedPost = action.payload;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPostsCount: (state, action) => {
      state.postsCount = action.payload;
      state.loading = false;
    },
    deletePostStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    deletePostSuccess: (state, action) => {
      state.isFetching = false;
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
    deletePostFailure: (state) => {
      state.isFetching = false;
      state.error = "Error deleting post";
    },
    addCommentToPost(state, action) {
      state.post.comments.push(action.payload);
    },
  },
});

export const {
  setPosts,
  setLoading,
  setSelectedPost,
  setError,
  setPostsCount,
  deletePostStart,
  deletePostSuccess,
  deletePostFailure,
} = postSlice.actions;
export default postSlice.reducer;
