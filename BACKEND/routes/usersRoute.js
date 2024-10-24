const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUsersProfileCtrl,
  updateUserProfileCtrl,
  getUsersCountCtrl,
  profilePhotoUploadCtrl,
} = require("../controllers/userController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndOnlyUser,
  VerifyToken,
} = require("../middlewares/verifyToken");

const validateObjectId = require("../middlewares/validateObjectId");
const photoUpload = require("../middlewares/photoUpload");
router.route("/profile").get(verifyTokenAndAdmin, getAllUsersCtrl);
router
  .route("/profile/:id")
  .get(validateObjectId, getUsersProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl);
router
  .route("/profile/profile-photo-upload")
  .post(VerifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;
