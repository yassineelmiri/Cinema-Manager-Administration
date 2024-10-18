import { React, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/main.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import swal from "sweetalert";
import logo from "../../assets/img/series/logo.png";
import bgImage from "../../assets/img/bg.jpg";
import { registerUser } from "../../redux/apiCalls/authApiCall";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerMessage } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (username.trim() === "") {
      return toast.error("Username is required");
    }
    if (email.trim() === "") {
      return toast.error("Email is required");
    }
    if (password.trim() === "") {
      return toast.error("Password is required");
    }
    dispatch(registerUser({ username, email, password }));
  };

  useEffect(() => {
    if (registerMessage) {
      swal({
        title: registerMessage,
        icon: "success",
      }).then((isOk) => {
        if (isOk) {
          navigate("/signin"); 
        }
      });
    }
  }, [registerMessage, navigate]);
  return (
    <div
      className="sign section--full-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sign__content">
              <form onSubmit={formSubmitHandler} className="sign__form">
                <Link to="/" className="sign__logo">
                  <img src={logo} alt="Logo" />
                </Link>
                <div className="sign__group">
                  <input
                    type="text"
                    className="sign__input"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="email"
                    className="sign__input"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="sign__group">
                  <input
                    type="password"
                    className="sign__input"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="sign__btn">
                  Sign Up
                </button>
                <span className="sign__delimiter">or</span>
                <span className="sign__text">
                  Don't have an account? <Link to="/signin">Sign in!</Link>
                </span>
                <span className="sign__text">
                  <Link to="/forgot-password">Forgot password?</Link>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
