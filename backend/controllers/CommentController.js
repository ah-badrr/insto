import Comment from "../models/CommentModel.js";
import User from "../models/UserModel.js";

export const getComments = async (req, res) => {
  try {
    const response = await Comment.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCommentById = async (req, res) => {
  try {
    const response = await Comment.findAll({
      where: {
        postId: req.params.post,
        // userId: req.params.user,
      },include:[User]
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createComment = async (req, res) => {
  try {
    await Comment.create(req.body);
    res.status(201).json({ msg: "Comment Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateComment = async (req, res) => {
  try {
    await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Comment Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteComment = async (req, res) => {
  try {
    await Comment.destroy({
      where: {
        postId: req.params.post,
        userId: req.params.user,
      },
    });
    res.status(200).json({ msg: "Comment Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
