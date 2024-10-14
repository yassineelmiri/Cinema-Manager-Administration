import { Link, useParams } from "react-router-dom";
import bgImage from "../../assets/img/bg.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyEmail } from "../../redux/apiCalls/authApiCall";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const { isEmailVerified } = useSelector((state) => state.auth);

  const { userId, token } = useParams();
  useEffect(() => {
    dispatch(verifyEmail(userId, token));
  }, [dispatch, userId, token]);
  return (
    <>
      <div
        className="page-404 section--full-bg"
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="container">
          {!isEmailVerified ? (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="page-404__wrap">
                    <div className="page-404__content">
                      <h1 className="page-404__title">Verify Email </h1>
                      <p className="page-404__text">
                        Your email address has been successfully verifed
                      </p>
                      <Link to="/signin" className="page-404__btn">
                        Go Login
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="row">
                <div className="col-12">
                  <div className="page-404__wrap">
                    <div className="page-404__content">
                      <h1 className="page-404__title">Not Found</h1>
                      <Link to="/" className="page-404__btn">
                        Go home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
