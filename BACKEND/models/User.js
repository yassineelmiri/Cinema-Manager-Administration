const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 4,
    },
    profilePhoto: {
      type: Object,
      default: {
        url: "https://cdn.pixabay.com/photo/2017/02/25/22/04/user-icon-2098873_1280.png",
        publicId: null,
      },
    },
    bio: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
//generate Auth Token
UserSchema.methods.generateAuthToken = function () {
  return jwt.sign(
    { id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_SECRET
  );
};

// User Model
const User = mongoose.model("User", UserSchema);
//Validate Register User
function validateRegiterUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(2).max(100).trim().required(),
    email: Joi.string().min(5).max(100).trim().required().email(),
    password: Joi.string().min(4).max(100).trim().required(),
  });
  return schema.validate(obj);
}

//Validation Login User
function validateLoginUser(obj) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(100).trim().required().email(),
    password: Joi.string().min(4).max(100).trim().required(),
  });
  return schema.validate(obj);
}

//Validation Update User
function validateUpdateUser(obj) {
  const schema = Joi.object({
    username: Joi.string().min(5).max(100).trim(),
    password: Joi.string().min(4).max(100).trim(),
    bio: Joi.string(),
  });
  return schema.validate(obj);
}

module.exports = {
  User,
  validateRegiterUser,
  validateLoginUser,
  validateUpdateUser,
};
