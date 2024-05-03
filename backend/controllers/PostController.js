import Post from "../models/PostModel.js";
import path from "path";
import fs from "fs";
import User from "../models/UserModel.js";
import Like from "../models/LikeModel.js";
import Comment from "../models/CommentModel.js";

export const getPosts = async (req, res) => {
  try {
    const response = await Post.findAll({ include: [Like, User, Comment] });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostById = async (req, res) => {
  try {
    const response = await Post.findOne({
      where: {
        id: req.params.id,
      },
      include: [Like, User, Comment],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostByUser = async (req, res) => {
  try {
    const response = await Post.findAll({
      where: {
        userId: req.params.user,
      },
      include: [User, Like, Comment],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "No File Uploaded" });
  const userId = req.body.userId;
  const caption = req.body.caption;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  let type = "";
  if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
    type = "picture";
  } else {
    type = "video";
  }
  const fileName = file.md5 + Math.random() + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg", ".mkv", ".mp4", ".avi"];
  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 15000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Post.create({ userId: userId, caption: caption, image: fileName, url: url, type: type });
      res.status(201).json({ msg: "Post Created Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const updatePost = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
  const userId = req.body.userId;
  const caption = req.body.caption;

  if (req.files) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    let type = "";
    if (ext == ".jpg" || ext == ".jpeg" || ext == ".png") {
      type = "picture";
    } else {
      type = "video";
    }
    fileName = file.md5 + Math.random() + ext; 
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg", ".mkv", ".mp4", ".avi"];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 15000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    if (post.image != null) {
      const filepath = `./public/images/${post.image}`;
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    try {
      await Post.update(
        { userId: userId, caption: caption, image: fileName, url: url, type: type },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ msg: "Post Updated Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  }
  try {
    await Post.update(
      { userId: userId, caption: caption },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Post Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletePost = async (req, res) => {
  const post = await Post.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!post) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${post.image}`;
    fs.unlinkSync(filepath);
    await Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Post Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
