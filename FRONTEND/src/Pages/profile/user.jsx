/* eslint-disable jsx-a11y/img-redundant-alt */
import Header from "../../home/header";
import Footer from "../../home/footer";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const User = () => {
  const { user } = useSelector((state) => state.auth);

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
                      alt="User image"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div className="profile__meta profile__meta--green">
                    <h3>
                      User Name: {user.username} <span>(client)</span>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default User;
