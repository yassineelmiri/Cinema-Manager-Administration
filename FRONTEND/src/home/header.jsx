import React from "react";
import logo from "../assets/img/series/logo.png";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls/authApiCall";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <header className="header header--static">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <button className="header__menu" type="button">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>

                <a href="/" className="header__logo">
                  <img
                    src={logo}
                    alt="Movies & TV Shows, Online cinema HTML Template"
                  />
                </a>

                <ul className="header__nav">
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="/"
                      role="button"
                      id="dropdownMenu2"
                    >
                      Home{" "}
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1.93893 3.30334C1.08141 3.30334 0.384766 2.60669 0.384766 1.75047C0.384766 0.894254 1.08141 0.196308 1.93893 0.196308C2.79644 0.196308 3.49309 0.894254 3.49309 1.75047C3.49309 2.60669 2.79644 3.30334 1.93893 3.30334Z" />
                      </svg>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to="/posts"
                      role="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Liste Film{" "}
                      <svg
                        width="4"
                        height="4"
                        viewBox="0 0 4 4"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1.93893 3.30334C1.08141 3.30334 0.384766 2.60669 0.384766 1.75047C0.384766 0.894254 1.08141 0.196308 1.93893 0.196308C2.79644 0.196308 3.49309 0.894254 3.49309 1.75047C3.49309 2.60669 2.79644 3.30334 1.93893 3.30334Z" />
                      </svg>
                    </Link>

                    <ul
                      className="dropdown-menu header__nav-menu"
                      aria-labelledby="dropdownMenu1"
                    >
                      <li>
                        <Link to="/posts">Liste Film</Link>
                      </li>
                      <li className="dropdown-submenu">
                        <Link
                          className="dropdown-item"
                          to="/posts"
                          role="button"
                          id="dropdownMenuSub"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Liste Film{" "}
                          <svg
                            width="4"
                            height="4"
                            viewBox="0 0 4 4"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M1.93893 3.30334C1.08141 3.30334 0.384766 2.60669 0.384766 1.75047C0.384766 0.894254 1.08141 0.196308 1.93893 0.196308C2.79644 0.196308 3.49309 0.894254 3.49309 1.75047C3.49309 2.60669 2.79644 3.30334 1.93893 3.30334Z" />
                          </svg>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="header__nav-item">
                    <Link
                      to="/Profile"
                      className="header__nav-link"
                      href="pricing"
                    >
                      Profile
                    </Link>
                  </li>
                  <li className="header__nav-item">
                  </li>
                </ul>

                <div className="header__auth">
                  <button className="header__search" type="button">
                    <i className="icon ion-ios-search"></i>
                  </button>
                  {user ? (
                    <>
                      <Link to="/" onClick={() => dispatch(logoutUser())}
                        className="header__user"
                      >
                        log-out
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"/></svg>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signin" className="header__user">
                        sign-in
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"/></svg>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
