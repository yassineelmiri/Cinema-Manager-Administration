const asyncHandler = require("express-async-handler");
const { Comment, validateCreateComment } = require("../models/Comment");
const { User } = require("../models/User");

/**-----------------------------------------------
 * @desc Create New Comment
 * @route /api/comments
 * @method POST
 * @access private (only logged in user)
 --------------------------------------------------*/
module.exports.createCommentCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateComment(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const profile = await User.findById(req.body.user);

  if (!profile) {
    return res.status(404).json({ message: "User not found" });
  }

  const comment = await Comment.create({
    postId: req.body.postId,
    text: req.body.text,
    user: req.body.user,
    username: profile.username,
  });
  res.status(201).json(comment);
});

/**-----------------------------------------------
 * @desc Get All Comments
 * @route /api/comments
 * @method GET
 * @access public
 --------------------------------------------------*/
module.exports.getCommentsCtrl = asyncHandler(async (req, res) => {
  const comments = await Comment.find().populate("user", "username");
  res.status(200).json(comments);
});
// Mettre à jour un commentaire
module.exports.updateCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  if (comment.user.toString() !== req.body.user) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  comment.text = text;
  await comment.save();

  res.status(200).json(comment);
});

// Supprimer un commentaire
module.exports.deleteCommentCtrl = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const comment = await Comment.findByIdAndDelete(id);
  if (!comment) {
    return res.status(404).json({ message: "Comment not found" });
  }
  res.status(200).json({ message: "Comment deleted successfully" });

});
