const formidable = require("formidable");
const { body, validationResult } = require("express-validator");
const { htmlToText } = require("html-to-text");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const Blog = require("../models/BlogModel");
const CommentBlog = require("../models/CommentModel");

const createBlog = (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    const { title, description, value, blogUrl, id, name } = fields;
    const errors = [];
    if (title === "") {
      errors.push({ msg: "Title is required." });
    }
    if (description === "") {
      errors.push({ msg: "Meta description is required." });
    }
    if (value === "") {
      errors.push({ msg: "Description is required." });
    }
    if (blogUrl === "") {
      errors.push({ msg: "Blog URL is required." });
    }
    if (Object.keys(files).length === 0) {
      errors.push({ msg: "Image is required." });
    } else {
      const { type } = files.image;
      const split = type.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        errors.push({ msg: `${extension} is not a valid extension.` });
      } else {
        files.image.name = uuidv4() + "." + extension;
      }
    }
    const checkBlogUrl = await Blog.findOne({ blogUrl });
    if (checkBlogUrl) {
      errors.push({ msg: "Please choose a unique URL." });
    }
    if (errors.length !== 0) {
      return res.status(400).json({ errors, files });
    } else {
      const newPath =
        __dirname + `/../client/public/images/${files.image.name}`;
      fs.copyFile(files.image.path, newPath, async (error) => {
        try {
          const response = await Blog.create({
            title,
            description,
            value,
            blogUrl,
            image: files.image.name,
            userName: name,
            userId: id,
          });
          res.status(200).json({
            msg: "Your blog has been created successfully.",
            response,
          });
        } catch (error) {
          res.status(500).json({ errors: error, msg: error.message });
        }
      });
    }
  });
};

const updateValidation = [
  body("title").notEmpty().trim().withMessage("Title is required"),
  body("value")
    .notEmpty()
    .trim()
    .custom((value) => {
      let bodyValue = value.replace(/\n/g, "");
      if (htmlToText(bodyValue).trim().length === 0) {
        return false;
      } else {
        return true;
      }
    })
    .withMessage("Description is required"),
  body("description").notEmpty().trim().withMessage("Description is required"),
];

const updateBlog = async (req, res) => {
  const { title, description, value, id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    try {
      const response = await Blog.findByIdAndUpdate(id, {
        title,
        description,
        value,
      });
      return res
        .status(200)
        .json({ msg: "Your Blog has been updated successfully." });
    } catch (error) {
      res.status(500).json({ errors: error, msg: error.message });
    }
  }
};

const updateImage = async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (error, fields, files) => {
    const { id } = fields;
    const imageErrors = [];
    if (Object.keys(files).length === 0) {
      imageErrors.push({ msg: "Please choose image" });
    } else {
      const { type } = files.image;
      const split = type.split("/");
      const extension = split[1].toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        imageErrors.push({ msg: `${extension} is not a valid extension.` });
      } else {
        files.image.name = uuidv4() + "." + extension;
      }
    }
    if (imageErrors.length !== 0) {
      res.status(400).json({ errors: imageErrors });
    } else {
      const newPath =
        __dirname + `/../client/public/images/${files.image.name}`;
      fs.copyFile(files.image.path, newPath, async (error) => {
        if (!error) {
          try {
            const response = await Blog.findByIdAndUpdate(id, {
              image: files.image.name,
            });
            return res
              .status(200)
              .json({ msg: "Your blog image has been updated." });
          } catch (error) {
            res.status(500).json({ errors: error, msg: error.message });
          }
        }
      });
    }
  });
};

const fetchBlogs = async (req, res) => {
  const id = req.params.id;
  const page = req.params.page;
  const perPage = 5;
  const skip = (page - 1) * perPage;
  try {
    const count = await Blog.find({ userId: id }).countDocuments();

    const response = await Blog.find({ userId: id })
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ response: response, count, perPage });
  } catch (error) {
    res.status(500).json({ errors: error, msg: error.message });
  }
};

const fetchBlogById = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOne({ _id: id });
    res.status(200).json({ blog });
  } catch (error) {
    res.status(500).json({ errors: error, msg: error.message });
  }
};

const fetchAllBlogs = async (req, res) => {
  const page = req.params.page;
  const perPage = 5;
  const skip = (page - 1) * perPage;
  try {
    const count = await Blog.find({}).countDocuments();

    const response = await Blog.find({})
      .skip(skip)
      .limit(perPage)
      .sort({ updatedAt: -1 });
    return res.status(200).json({ response: response, count, perPage });
  } catch (error) {
    res.status(500).json({ errors: error, msg: error.message });
  }
};

const fetchBlogDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const blog = await Blog.findOne({ blogUrl: id });
    const comments = await CommentBlog.find({ postId: blog._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json({ blog, comments });
  } catch (error) {
    res.status(500).json({ errors: error, msg: error.message });
  }
};

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  try {
    const response = await Blog.findByIdAndRemove(id);
    return res.status(200).json({ msg: "Your blog has been deleted." });
  } catch (error) {
    res.status(500).json({ errors: error, msg: error.message });
  }
};

const blogComment = async (req, res) => {
  const { id, comment, userName } = req.body;
  try {
    const response = await CommentBlog.create({
      postId: id,
      comment,
      userName,
    });
    return res
      .status(200)
      .json({ msg: "Your comment has been published.", comment: response });
  } catch (error) {
    res.status(500).json({ errors: error, msg: error.message });
  }
};

module.exports = {
  createBlog,
  updateBlog,
  updateValidation,
  updateImage,
  fetchBlogs,
  fetchBlogById,
  fetchAllBlogs,
  fetchBlogDetails,
  deleteBlog,
  blogComment,
};
