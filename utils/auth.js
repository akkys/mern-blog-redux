const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split("Bearer ")[1];
  //   console.log(token);
  try {
    jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (error) {
    res.status(401).json({ errors: [{ msg: error.message }] });
  }
};

module.exports = auth;
