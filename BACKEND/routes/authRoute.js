const router = require("express").Router();
const { registerUserCtrl, LoginUserCtrl } = require("../controllers/authController");

// /api/auth/register
router.post("/register",registerUserCtrl);
// /api/auth/login
router.post("/login",LoginUserCtrl)

module.exports = router;
