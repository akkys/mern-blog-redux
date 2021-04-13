const router = require("express").Router();
const {
  createBlog,
  fetchBlogs,
  fetchBlogById,
  updateBlog,
  updateValidation,
  updateImage,
  deleteBlog,
  fetchAllBlogs,
  fetchBlogDetails,
} = require("../controllers/BlogController");
const auth = require("../utils/auth");

//Create blog - Private Route
router.post("/create", auth, createBlog);

//Update blog - Private Route
router.post("/update", [auth, updateValidation], updateBlog);

//Update blog image - Private Route
router.post("/updateImage", auth, updateImage);

//Fetch all blogs - Private Route
router.get("/get/:id/:page", auth, fetchBlogs);

//Fetch blog by Id - Private Route
router.get("/get/:id", auth, fetchBlogById);

//Fetch all blog - Public Route
router.get("/getAll/:page", fetchAllBlogs);

//Fetch blog's details by Id - Public Route
router.get("/blogDetails/:id", fetchBlogDetails);

//Delete blog by Id - Private Route
router.get("/delete/:id", auth, deleteBlog);

module.exports = router;
