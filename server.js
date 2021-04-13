const express = require("express");
const connectDb = require("./config/db");
require("dotenv").config();

//Import Routes
const userRoute = require("./routes/UserRoute");
const blogRoute = require("./routes/BlogRoute");
const profileRoute = require("./routes/ProfileRoute");

connectDb();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/", userRoute);
app.use("/blogs", blogRoute);
app.use("/profile", profileRoute);

app.listen(PORT, () => {
  console.log("Server is running at " + PORT);
});
