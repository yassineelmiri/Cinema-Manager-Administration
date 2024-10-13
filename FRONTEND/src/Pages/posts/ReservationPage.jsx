// ReservationPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPostById } from "../../redux/apiCalls/postApiCall"; 
import { makeReservation } from "../../redux/apiCalls/reservationApiCall";

const ReservationPage = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post.selectedPost);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [seat, setSeat] = useState("");

  useEffect(() => {
    dispatch(fetchPostById(id));
  }, [dispatch, id]);

  const handleReservation = () => {
    const reservationData = {
      movieId: post._id,
      date,
      time,
      seat,
    };

    dispatch(makeReservation(reservationData));
  };

  return (
    <div className="reservation-page">
      <h1>Réserver une séance pour {post?.title}</h1>
      <div>
        <label>Date :</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>Heure :</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
      </div>
      <div>
        <label>Siège :</label>
        <input type="text" value={seat} onChange={(e) => setSeat(e.target.value)} placeholder="Numéro du siège" />
      </div>
      <button onClick={handleReservation}>Confirmer la réservation</button>
    </div>
  );
};

export default ReservationPage;
