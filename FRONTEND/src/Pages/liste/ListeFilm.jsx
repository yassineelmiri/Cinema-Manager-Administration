import React, { useState, useEffect } from "react";
import Sidebar from "../Admin/SidebarAdmin";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost, deletePost } from "../../redux/apiCalls/postApiCall";
import { Link } from "react-router-dom";

const ListFilm = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  useEffect(() => {
    dispatch(fetchPost(1));
  }, [dispatch]);

  const handleDelete = (postId) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(postId));
    }
  };

  const handleUpdateClick = (post) => {
    setCurrentPost(post);
    setShowUpdateModal(true);
  };

  const closeModal = () => {
    setShowUpdateModal(false);
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    closeModal();
  };

  return (
    <div>
      <Sidebar />
      <main className="main">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="main__title">
                <h2>Film List</h2>
                <span className="main__title-stat">{posts.length} total</span>
              </div>
            </div>

            <div className="col-12">
              <div className="main__table-wrap">
                <table className="main__table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>IMAGE</th>
                      <th>CATEGORY</th>
                      <th>DESCRIPTION</th>
                      <th>STATUS</th>
                      <th>UPDATE DATE</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map((post) => (
                      <tr key={post._id}>
                        <td>
                          <div className="main__table-text">
                            #{post._id.substring(4, 7)}...
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            <Link to="/">{post.title}</Link>
                          </div>
                        </td>
                        <td>
                          <img
                            className="main__table-img"
                            src={post.image.url}
                            alt={post.title}
                            style={{
                              width: "50px",
                              height: "50px",
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td>
                          <div className="main__table-text">
                            {post.category}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {post.description.substring(0, 13)}...
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text main__table-text--green">
                            {post.likes ? "Liked" : "No likes"}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-text">
                            {new Date(post.updatedAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <div className="main__table-btns">
                            <a
                              href="#modal-status"
                              className="main__table-btn main__table-btn--banned open-modal"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12,13a1.49,1.49,0,0,0-1,2.61V17a1,1,0,0,0,2,0V15.61A1.49,1.49,0,0,0,12,13Zm5-4V7A5,5,0,0,0,7,7V9a3,3,0,0,0-3,3v7a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V12A3,3,0,0,0,17,9ZM9,7a3,3,0,0,1,6,0V9H9Zm9,12a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V12a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
                              </svg>
                            </a>
                            <Link
                              to="#"
                              onClick={() => handleUpdateClick(post)}
                              className="main__table-btn main__table-btn--view"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M21.92,11.6C19.9,6.91,16.1,4,12,4S4.1,6.91,2.08,11.6a3,3,0,0,0,0,2.8C4.1,17.09,7.9,20,12,20s7.9-2.91,9.92-7.6A3,3,0,0,0,21.92,11.6ZM12,18c-3.18,0-6.17-2.29-7.82-6A13.43,13.43,0,0,1,12,6c3.18,0,6.17,2.29,7.82,6A13.43,13.43,0,0,1,12,18Z" />
                                <path d="M12,8a4,4,0,1,0,4,4A4,4,0,0,0,12,8Zm0,6a2,2,0,1,1,2-2A2,2,0,0,1,12,14Z" />
                              </svg>
                            </Link>
                            <Link
                              to="#"
                              onClick={() => handleDelete(post._id)}
                              className="main__table-btn main__table-btn--delete open-modal"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M20,4H17V3a2,2,0,0,0-2-2H9A2,2,0,0,0,7,3V4H4A1,1,0,0,0,4,6H5.08l1.08,13.07A3,3,0,0,0,9.13,22H14.87a3,3,0,0,0,2.97-2.93L18.92,6H20A1,1,0,0,0,20,4ZM9,4h6V3H9ZM16.92,19a1,1,0,0,1-1,.93H9.13a1,1,0,0,1-1-.93L7.08,6H16.92Z" />
                              </svg>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
      {showUpdateModal && (
        <div className="mfp-content">
          <div id="modal-status" className="zoom-anim-dialog modal">
            <h3 className="modal__title">Update Post</h3>
            <form onSubmit={handleUpdate}>
              <input
                type="text"
                className="form__input"
                value={currentPost?.title}
                onChange={(e) =>
                  setCurrentPost({ ...currentPost, title: e.target.value })
                }
              />
              <textarea
                className="form__textarea"
                value={currentPost?.description}
                onChange={(e) =>
                  setCurrentPost({
                    ...currentPost,
                    description: e.target.value,
                  })
                }
              />
              <div className="form__group">
                <select
                  className="form__input"
                  id="quality"
                  name="quality"
                  value={currentPost?.category}
                  onChange={(e) =>
                    setCurrentPost({ ...currentPost, category: e.target.value })
                  }
                >
                  <option value="Movie">Movie</option>
                  <option value="Comidia">Comidia</option>
                  <option value="Action">Action</option>
                  <option value="Drama">Drama</option>
                </select>
              </div>
              <div className="modal__btns">
                <button className="modal__btn modal__btn--apply" type="submit">
                  Update
                </button>
                <button
                  className="modal__btn modal__btn--dismiss"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListFilm;
