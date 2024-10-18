const router = require("express").Router();
const { createCommentCtrl, getCommentsCtrl } = require("../controllers/commentsController");

router.post("/", createCommentCtrl);
router.get("/", getCommentsCtrl);

module.exports = router;
