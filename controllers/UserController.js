const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/UserModel");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "7d",
  });
};

const registerValidations = [
  body("name").not().isEmpty().trim().withMessage("Name is required."),
  body("email").not().isEmpty().trim().withMessage("Email is required."),
  body("password").not().isEmpty().trim().withMessage("Password is required."),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters long."),
];

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken." }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        name,
        email,
        password: hashPassword,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ msg: "Your account has been created.", token });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

const loginValidations = [
  body("email").not().isEmpty().trim().withMessage("Email is required."),
  body("password").not().isEmpty().trim().withMessage("Password is required."),
];

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matchedUser = await bcrypt.compare(password, user.password);
      if (matchedUser) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ msg: "You have logged in Successfully.", token });
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: "Password is Incorrect." }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found." }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

module.exports = { register, registerValidations, login, loginValidations };
