import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/main.css";
import '../../assets/css/bootstrap-grid.min.css';
import '../../assets/css/bootstrap-reboot.min.css';
import '../../assets/css/magnific-popup.css';
import '../../assets/css/plyr.css';
import '../../assets/css/select2.min.css';
import '../../assets/css/slider-radio.css';
import '../../assets/css/owl.carousel.min.css';
import { toast } from "react-toastify"; 
import { useDispatch, useSelector } from "react-redux";
import logo from "../../assets/img/series/logo.png";
import bgImage from "../../assets/img/bg.jpg";
import { loginUser } from "../../redux/apiCalls/authApiCall"; 

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  
  const { user } = useSelector(state => state.auth);

  const formSubmitHandler = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      return toast.error("Email is required");
    }
    if (password.trim() === "") {
      return toast.error("Password is required");
    }

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (user) {
      toast.success("Successfully logged in!"); 
    }
  }, [user]); 
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
                <div className="sign__group sign__group--checkbox">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    defaultChecked
                  />
                </div>
                <button className="sign__btn" type="submit">
                  Sign In
                </button>
                <span className="sign__delimiter">or</span>
                <span className="sign__text">
                  Don't have an account? <Link to="/signup">Sign up!</Link>
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
