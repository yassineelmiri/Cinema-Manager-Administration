const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl,
  toggleLikePostCtrl,
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const { VerifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /posts
router
  .route("/")
  .post(VerifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /posts/count
router.route("/count").get(getPostCountCtrl);

// /posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, VerifyToken, deletePostCtrl)
  .put(validateObjectId, VerifyToken, updatePostCtrl);

// /posts/update-image/:id
router
  .route("/update-image/:id")
  .put(
    validateObjectId,
    VerifyToken,
    photoUpload.single("image"),
    updatePostImageCtrl
  );

// /posts/:id/like
router.route("/:id/like").put(VerifyToken ,toggleLikePostCtrl);

module.exports = router;
