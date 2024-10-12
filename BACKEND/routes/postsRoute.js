const router = require("express").Router();
const {
  createPostCtrl,
  getAllPostsCtrl,
  getSinglePostCtrl,
  getPostCountCtrl,
  deletePostCtrl,
  updatePostCtrl,
  updatePostImageCtrl
} = require("../controllers/postsController");
const photoUpload = require("../middlewares/photoUpload");
const { VerifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectId");

// /api/posts
router
  .route("/")
  .post(VerifyToken, photoUpload.single("image"), createPostCtrl)
  .get(getAllPostsCtrl);

// /api/posts/count
router.route("/count").get(getPostCountCtrl);

// /api/posts/:id
router
  .route("/:id")
  .get(validateObjectId, getSinglePostCtrl)
  .delete(validateObjectId, VerifyToken, deletePostCtrl)
  .put(validateObjectId, VerifyToken, updatePostCtrl);


// /api/posts/update-image/:id
router.route("/update-image/:id")
.put(validateObjectId,VerifyToken,photoUpload.single("image"),updatePostImageCtrl)

module.exports = router;
