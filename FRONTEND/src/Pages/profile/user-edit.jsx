/* eslint-disable jsx-a11y/img-redundant-alt */
import Header from "../../home/header";
import Footer from "../../home/footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserEdit = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <>
      <Header />
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Edit user</h2>
              </div>
            </div>

            <div className="col-12">
              <div className="profile__content">
                <div className="profile__user">
                  <div className="profile__avatar">
                    <img
                      className="main__table-img"
                      src={user.profilePhoto.url}
                      alt="image"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover"
                      }}
                    />
                  </div>
                  <div className="profile__meta profile__meta--green">
                    <h3>
                      User Name :{user.username} : <span>(client)</span>
                    </h3>
                    <span>Cinema ID: {user._id}</span>
                  </div>
                </div>

                <ul
                  className="nav nav-tabs profile__tabs"
                  id="profile__tabs"
                  role="tablist"
                >
                  <li className="nav-item">
                    <Link
                      className="nav-link active"
                      data-toggle="tab"
                      to="#tab-1"
                      role="tab"
                      aria-controls="tab-1"
                      aria-selected="true"
                    >
                      Profile
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-toggle="tab"
                      to="#tab-2"
                      role="tab"
                      aria-controls="tab-2"
                      aria-selected="false"
                    >
                      Reservation
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      data-toggle="tab"
                      to="#tab-3"
                      role="tab"
                      aria-controls="tab-3"
                      aria-selected="false"
                    >
                      Hestorique
                    </Link>
                  </li>
                </ul>

                <div className="profile__mobile-tabs" id="profile__mobile-tabs">
                  <span></span>
                </div>

                <div
                  className="profile__mobile-tabs-menu dropdown-menu"
                  aria-labelledby="mobile-tabs"
                >
                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <Link
                        className="nav-link active"
                        id="1-tab"
                        data-toggle="tab"
                        to="#tab-1"
                        role="tab"
                        aria-controls="tab-1"
                        aria-selected="true"
                      >
                        Profile
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        id="2-tab"
                        data-toggle="tab"
                        to="#tab-2"
                        role="tab"
                        aria-controls="tab-2"
                        aria-selected="false"
                      >
                        Comments
                      </Link>
                    </li>

                    <li className="nav-item">
                      <Link
                        className="nav-link"
                        id="3-tab"
                        data-toggle="tab"
                        to="#tab-3"
                        role="tab"
                        aria-controls="tab-3"
                        aria-selected="false"
                      >
                        Reviews
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="tab-1"
              role="tabpanel"
              aria-labelledby="1-tab"
            >
              <div className="col-12">
                <div className="sign__wrap">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <form
                        action="#"
                        className="sign__form sign__form--profile sign__form--first"
                      >
                        <div className="row">
                          <div className="col-12">
                            <h4 className="sign__title">Profile details</h4>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" htmlFor="username">
                                User Name
                              </label>
                              <input
                                id="username"
                                type="text"
                                name="username"
                                className="sign__input"
                                placeholder={user.username}
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" htmlFor="email">
                                Email
                              </label>
                              <input
                                id="email"
                                type="text"
                                name="email"
                                className="sign__input"
                                placeholder={user.email}
                              />
                            </div>
                          </div>
                          <div className="col-12">
                            <button className="sign__btn" type="button">
                              Save
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="col-12 col-lg-6">
                      <form
                        action="#"
                        className="sign__form sign__form--profile"
                      >
                        <div className="row">
                          <div className="col-12">
                            <h4 className="sign__title">Change password</h4>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" htmlFor="oldpass">
                                Old password
                              </label>
                              <input
                                id="oldpass"
                                type="password"
                                name="oldpass"
                                className="sign__input"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label className="sign__label" htmlFor="newpass">
                                New password
                              </label>
                              <input
                                id="newpass"
                                type="password"
                                name="newpass"
                                className="sign__input"
                              />
                            </div>
                          </div>

                          <div className="col-12 col-md-6 col-lg-12 col-xl-6">
                            <div className="sign__group">
                              <label
                                className="sign__label"
                                htmlFor="confirmpass"
                              >
                                Confirm new password
                              </label>
                              <input
                                id="confirmpass"
                                type="password"
                                name="confirmpass"
                                className="sign__input"
                              />
                            </div>
                          </div>

                          <div className="col-12">
                            <button className="sign__btn" type="button">
                              Change
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserEdit;
