const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {
  User,
  validateRegiterUser,
  validateLoginUser,
} = require("../models/User");

/**-----------------------------------------------
 * @desc Register New User 
 * @router /api/auth/register
 * @method POST
 * @access public
-------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // Validation par modèle
  const { err } = validateRegiterUser(req.body);
  if (err) {
    return res.status(400).json({ Message: err.details[0].message });
  }

  if (!req.body.password) {
    return res.status(400).json({ Message: "Password is required" });
  }

  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ Message: "User already exists" });
  }

  // Hachage du mot de passe
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });

  await user.save();

  res
    .status(201)
    .json({ message: "You registered successfully, please log in" });
});

/**-----------------------------------------------
 * @desc Login User
 * @router /api/auth/login
 * @method POST
 * @access public
-------------------------------------------------*/
module.exports.LoginUserCtrl = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email" });
  }
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid password" });
  }

  const token = user.generateAuthToken();

  res.status(200).json({
    _id: user._id,
    isAdmin: user.isAdmin,
    profilePhoto: user.profilePhoto,
    token,
    username: user.username,
  });
});
