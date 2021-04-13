const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
require("dotenv").config();
const User = require("../models/UserModel");

const updateUserName = async (req, res) => {
  const { name, id } = req.body;
  if (name === "") {
    return res.status(400).json({ errors: [{ msg: "Name is required." }] });
  } else {
    try {
      const user = await User.findOneAndUpdate(
        { _id: id },
        { name: name },
        { new: true }
      );
      const token = jwt.sign({ user }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      return res
        .status(200)
        .json({ token, msg: "Your name has been updated." });
    } catch (error) {
      return res.status(500).json({ errors });
    }
  }
};

const updatePasswordValidations = [
  body("currentPassword")
    .not()
    .isEmpty()
    .trim()
    .withMessage("Current password is required."),
  body("newPassword")
    .not()
    .isEmpty()
    .trim()
    .withMessage("New password is required."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New Password must be 6 characters long."),
];

const updateUserPassword = async (req, res) => {
  const { currentPassword, newPassword, userId } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    const user = await User.findOne({ _id: userId });
    if (user) {
      const matched = await bcrypt.compare(currentPassword, user.password);
      if (!matched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Current password is wrong." }] });
      } else {
        try {
          const salt = await bcrypt.genSalt(10);
          const hashPassword = await bcrypt.hash(newPassword, salt);
          const newUser = await User.findOneAndUpdate(
            { _id: user },
            { password: hashPassword },
            { new: true }
          );
          res
            .status(200)
            .json({ msg: "Your password has been updated!", newUser });
        } catch (error) {
          return res.status(500).json({ errors });
        }
      }
    }
  }
};

module.exports = {
  updateUserName,
  updateUserPassword,
  updatePasswordValidations,
};
