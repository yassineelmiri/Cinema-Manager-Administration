/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../../assets/css/admin.css";
import Sidebar from "./SidebarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, getPostCount } from "../../redux/apiCalls/postApiCall";
import { fetchSalles, getSalleCount } from "../../redux/apiCalls/salleApiCall"; 
import { Link } from "react-router-dom";

const AdminDashbord = () => {
  const { postsCount } = useSelector((state) => state.post);
  const { salleCount } = useSelector((state) => state.salle);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPost());
    dispatch(getPostCount());
    dispatch(fetchSalles());      
    dispatch(getSalleCount());     
    window.scrollTo(0, 0);
  }, [dispatch, currentPage]);

  return (
    <div>
      <Sidebar />
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Dashboard</h2>
                <Link to='/posts/create-post' className="main__title-link">
                  Ajouter post
                </Link>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span>Number of Films</span>
                <p>{postsCount || 0}</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z"/></svg>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span>Number of Salles</span>
                <p>{salleCount || 0}</p> 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M8,11a1,1,0,1,0,1,1A1,1,0,0,0,8,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,12,11Zm4,0a1,1,0,1,0,1,1A1,1,0,0,0,16,11ZM12,2A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"/></svg>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span>Reservation</span>
                <p>15</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a1,1,0,0,0,0,.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A1,1,0,0,0,21.92,11.6ZM12,18c-3.17,0-6.17-2.29-7.9-6C5.83,8.29,8.83,6,12,6s6.17,2.29,7.9,6C18.17,15.71,15.17,18,12,18ZM12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z"/></svg>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-xl-3">
              <div className="stats">
                <span>Seance</span>
                <p>9</p>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M22,9.67A1,1,0,0,0,21.14,9l-5.69-.83L12.9,3a1,1,0,0,0-1.8,0L8.55,8.16,2.86,9a1,1,0,0,0-.81.68,1,1,0,0,0,.25,1l4.13,4-1,5.68A1,1,0,0,0,6.9,21.44L12,18.77l5.1,2.67a.93.93,0,0,0,.46.12,1,1,0,0,0,.59-.19,1,1,0,0,0,.4-1l-1-5.68,4.13-4A1,1,0,0,0,22,9.67Zm-6.15,4a1,1,0,0,0-.29.88l.72,4.2-3.76-2a1.06,1.06,0,0,0-.94,0l-3.76,2,.72-4.2a1,1,0,0,0-.29-.88l-3-3,4.21-.61a1,1,0,0,0,.76-.55L12,5.7l1.88,3.82a1,1,0,0,0,.76.55l4.21.61Z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashbord;
