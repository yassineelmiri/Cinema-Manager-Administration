import bgImage from "../../assets/img/series/bg.jpg";
const Error = () => {
  return (
    <div
      className="page-404 section--full-bg"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="page-404__wrap">
              <div className="page-404__content">
                <h1 className="page-404__title">404</h1>
                <p className="page-404__text">
                  The page you are looking for is not available!
                </p>
                <a href="/" className="page-404__btn">
                  Go Back
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
