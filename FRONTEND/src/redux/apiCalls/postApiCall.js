import request from "../../utils/request";
import { toast } from "react-toastify";
import { setPosts, setLoading, setSelectedPost, setError, setPostsCount } from "../slices/postSlice";
import { createAsyncThunk } from '@reduxjs/toolkit';

// Fetch Posts Based on Page Number
export function fetchPost(pageNumber) {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await request.get(`/api/posts?pageNumber=${pageNumber}`);
      dispatch(setPosts(data));
    } catch (error) {
      dispatch(setError("Erreur lors de la récupération des posts."));
      toast.error(error.response?.data?.message || "Erreur lors de la récupération des posts.");
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Fetch Post by ID
export function fetchPostById(id) {
  return async (dispatch) => {
    dispatch(setLoading());
    try {
      const { data } = await request.get(`/api/posts/${id}`);
      dispatch(setSelectedPost(data));
    } catch (error) {
      const message = error.response?.data?.message || "Erreur lors de la récupération du post";
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

// Get Posts Count
export function getPostCount() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`/api/posts/count`);
      dispatch(setPostsCount(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la récupération du nombre de posts.");
    }
  };
}

// Create Post
export function createPost(formData) {
  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }

    dispatch(setLoading(true));

    try {
      const { data } = await request.post("/api/posts", formData, {
        headers: {
          'Authorization': `Bearer ${userInfo.token}` 
        },
      });

      console.log(formData);
      console.log(userInfo);

      dispatch(setPosts(data));

      toast.success("Post created successfully!");

      return data; 
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur lors de la création du post.");
      console.error("Erreur lors de la création du post :", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export const deletePost = createAsyncThunk(
    'post/deletePost',
    async (postId, { rejectWithValue }) => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      
      if (!userInfo || !userInfo.token) {
        return rejectWithValue('User is not authenticated');
      }
  
      try {
        const response = request.delete(`/api/posts/${postId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userInfo.token}` 
          }
        });
  
        if (!response.ok) {
          throw new Error('Failed to delete the post');
        }
        

        return async (dispatch) => { dispatch(setLoading(true))};    
      } catch (error) {
        return rejectWithValue(error.message); 
      }
    }
  );
  
