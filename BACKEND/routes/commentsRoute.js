const router = require("express").Router();
const { createCommentCtrl, getCommentsCtrl ,updateCommentCtrl,deleteCommentCtrl} = require("../controllers/commentsController");
const { VerifyToken } = require("../middlewares/verifyToken");

router.post("/", createCommentCtrl);
router.get("/", getCommentsCtrl);

// Nouvelles routes pour modifier et supprimer des commentaires
router.put("/:id",VerifyToken, updateCommentCtrl); 
router.delete("/:id",VerifyToken, deleteCommentCtrl);

module.exports = router;
