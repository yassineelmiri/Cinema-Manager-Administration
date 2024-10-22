import {
  updateUserSuccess,
  updateUserFail,
} from "../slices/userSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

// Update User Profile
export function updateUserProfile(userId, updatedData) {
  
  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }

    try {
      const { data } = await request.put(
        `/api/users/profile/${userId}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      console.log(data);

      dispatch(updateUserSuccess(data));
      toast.success("Profile updated successfully!");
    } catch (error) {
      dispatch(updateUserFail(error.response?.data?.message || error.message));
      if (error.response && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
}

// Upload Profile Photo
export const uploadProfilePhoto = (userId, formData) => {
  return async (dispatch) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (!userInfo || !userInfo.token) {
      toast.error("User is not authenticated");
      return;
    }

    try {
      const { data } = await request.post(
        `/api/users/profile/profile-photo-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
            'Content-Type': 'multipart/form-data', // Important pour envoyer les fichiers
          },
        }
      );

      dispatch(updateUserSuccess(data)); // Met à jour l'utilisateur avec la nouvelle photo
      toast.success("Profile photo updated successfully!");
    } catch (error) {
      dispatch(updateUserFail(error.response?.data?.message || error.message));
      toast.error("Error uploading profile photo");
    }
  };
};
