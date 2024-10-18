import { authActions } from "../slices/authSlice";
import { toast } from "react-toastify";
import request from "../../utils/request";

//LOGINE USER
export function loginUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await request.post("/api/auth/login", user);
      dispatch(authActions.login(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  };
}

//Logout User
export function logoutUser() {
  return async (dispatch) => {
    dispatch(authActions.logout());
    toast.success("logout successfully!");
    localStorage.removeItem("userInfo");
  };
}

//REGISTER USER
export function registerUser(user) {
    return async (dispatch) => {
      try {
        const { data } = await request.post("/api/auth/register", user);
        dispatch(authActions.Register(data.message)); 
        toast.success("Send Email successfully!");

      } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong. Please try again."); 
        }
      }
    };
}

//Verify Email
export function verifyEmail(userId,token) {
  return async (dispatch) => {
    try {
      await request.get(`/api/auth/${userId}/verify/${token}`);
      dispatch(authActions.setIsEmailVerified()); 
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again."); 
      }
    }
  };
}
