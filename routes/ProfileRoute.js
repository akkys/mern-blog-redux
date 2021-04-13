const router = require("express").Router();
const {
  updateUserName,
  updateUserPassword,
  updatePasswordValidations,
} = require("../controllers/ProfileController");
const auth = require("../utils/auth");

//Update profile name
router.post("/updateName", auth, updateUserName);

//Update profile password
router.post(
  "/updatePassword",
  [auth, updatePasswordValidations],
  updateUserPassword
);

module.exports = router;
