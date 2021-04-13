const router = require("express").Router();
const {
  register,
  registerValidations,
  login,
  loginValidations,
} = require("../controllers/UserController");

router.post("/register", registerValidations, register);

router.post("/login", loginValidations, login);

module.exports = router;
