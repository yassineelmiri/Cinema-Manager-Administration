import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./Pages/Home/index";
import SignIn from "./Pages/forms/Login.jsx";
import SignUp from "./Pages/forms/Register.jsx";
import PostsPage from "./Pages/posts/PostsPage.jsx";
import CreatePost from "./Pages/create-post/CreatePost.jsx";
import Error from "./Pages/404/error.jsx";
import AdminDashbord from "./Pages/Admin/AdminDashbord";
import PostDetail from "./Pages/posts/PostDetail.jsx";
import ForgotPassword from "./components/login/forgotpassword.jsx";
import ResetPassword from "./components/login/resetpassword.jsx";
import { useSelector } from "react-redux";
import ReservationPage from "./Pages/posts/ReservationPage.jsx";
import ListFilm from "./Pages/liste/ListeFilm.jsx";
import ListSalle from "./Pages/liste/ListeSalle.jsx";
import CreateSalle from "./Pages/create-post/CreateSalle.jsx";
import UserEdit from "./Pages/profile/user-edit.jsx";
import CreateSeance from "./Pages/create-post/CreateSeance.jsx";
import ListeSeance from "./Pages/liste/ListeSeance.jsx";
import VerifyEmail from "./components/login/verifyemail.jsx";
import User from "./Pages/profile/user.jsx";

function App() {
  const { user } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signin"
          element={!user ? <SignIn /> : <Navigate to="/admin" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route
          path="/user/:userId/verify/:token"
          element={!user ? <VerifyEmail /> : <Navigate to="/" />}
        />

        <Route
          path="/lougout"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route
          path="/posts/create-post"
          element={user?.isAdmin ? <CreatePost /> : <Navigate to="/" />}
        />
        <Route
          path="/posts/create-salle"
          element={user?.isAdmin ? <CreateSalle /> : <Navigate to="/" />}
        />
        <Route
          path="/posts/create-seance"
          element={user?.isAdmin ? <CreateSeance /> : <Navigate to="/" />}
        />
        <Route path="/posts/details/:id" element={<PostDetail />} />
        <Route
          path="/list/film"
          element={user?.isAdmin ? <ListFilm /> : <Navigate to="/" />}
        />
        <Route
          path="/list/salle"
          element={user?.isAdmin ? <ListSalle /> : <Navigate to="/" />}
        />
        <Route
          path="/list/Seance"
          element={user?.isAdmin ? <ListeSeance /> : <Navigate to="/" />}
        />

        <Route
          path="/admin"
          element={
            user?.isAdmin ? <AdminDashbord /> : <Navigate to="/Profile" />
          }
        />
        <Route path="/Profile" element={<UserEdit />} />
        <Route path="/user" element={<User />} />

        <Route path="/reserve/:id" component={ReservationPage} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
