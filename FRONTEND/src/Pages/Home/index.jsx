import React, { useEffect } from "react";
import Header from "../../home/header";
import Footer from "../../home/footer";
import "../../assets/css/main.css";
import "../../assets/css/bootstrap-grid.min.css";
import "../../assets/css/bootstrap-reboot.min.css";
import "../../assets/css/magnific-popup.css";
import "../../assets/css/plyr.css";
import "../../assets/css/select2.min.css";
import "../../assets/css/slider-radio.css";
import "../../assets/css/owl.carousel.min.css";
import PostsList from "../posts/PostsList";
import promoVideo from "../../assets/vedio/Black and Blue Neon Technology Video.mp4";

//  fetch
import { useDispatch } from "react-redux";
import { fetchPost } from "../../redux/apiCalls/postApiCall";
import Contact from "./contact";

export default function Movies() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost(1));
  }, [dispatch]);

  return (
    <>
      <Header />
      <section className="">
        <div className="">
          <div className="">
            <div className="col-12">
              <video
                src={promoVideo}
                loop
                autoPlay
                muted
                style={{
                  width: "100vw",
                  height: "auto",
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <hr />
      <section className="catalog">
        <div className="col-12 col-xl-6">
          <h1 className="section__title section__title--head">Liste Film</h1>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <PostsList />
            </div>
          </div>
        </div>
      </section>
      <hr />
      <Contact />
      <hr />
      <Footer />
    </>
  );
}
