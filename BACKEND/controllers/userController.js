const asyncHandler = require("express-async-handler");
const { User, validateUpdateUser } = require("../models/User");
const bcrypt = require("bcryptjs");

/**-----------------------------------------------
 * @desc Get All User Profile
 * @router /api/auth/profile
 * @method GET
 * @access private (only admin)
-------------------------------------------------*/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

/**-----------------------------------------------
 * @desc Get User Profile
 * @router /api/auth/profile/:id
 * @method GET
 * @access public
-------------------------------------------------*/
module.exports.getUsersProfileCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(400).json({ message: "user not found" });
  }
  res.status(200).json(user);
});

/**-----------------------------------------------
 * @desc Update User Profile
 * @router /api/auth/profile/:id
 * @method PUT
 * @access private (only user himself)
-------------------------------------------------*/
module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);

  if (error) {
    return res
      .status(400)
      .json({ success: false, message: error.details[0].message });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }

  const upadtedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio,
      },
    },
    { new: true, select: "-password" }
  );
  res.status(200).json(upadtedUser);
});

/**-----------------------------------------------
 * @desc Get User Count
 * @router /api/auth/count
 * @method GET
 * @access private (only admin)
-------------------------------------------------*/
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  try {
    const count = await User.countDocuments();
    res.status(200).json({ userCount: count });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**-----------------------------------------------
 * @desc Profile Photo Upload
 * @router /api/auth/profile/profile-photo-upload
 * @method GET
 * @access private (only logged in user)
-------------------------------------------------*/
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }
  res.status(200).json({ message: "Your profile photo uploaded successfully" });
});
/**-----------------------------------------------
 * @desc Delete User Profile
 * @router /api/auth/profile/:id
 * @method Delete
 * @access private (only admin of user himeself)
-------------------------------------------------*/
module.exports.deleteUSerProfileCtrl = asyncHandler(async (req, res) => {
  
});
