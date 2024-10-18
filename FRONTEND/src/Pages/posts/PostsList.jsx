import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPost } from "../../redux/apiCalls/postApiCall";
import PostItem from "./PostItem";

const PostsList = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchPost(1));
  }, [dispatch]);

  const filteredPosts = posts.filter(
    (post) =>
      post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher par titre..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="header__form-input"
      />
      <div className="row row--grid">
        {filteredPosts && filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post._id} className="col-6 col-sm-4 col-lg-3 col-xl-2">
              <PostItem
                imgSrc={post.image.url}
                rating={post.rating}
                title={post.title}
                list={post.categories || []}
                id={post._id}
              />
            </div>
          ))
        ) : (
          <div>No posts available.</div>
        )}
      </div>
    </div>
  );
};

export default PostsList;
