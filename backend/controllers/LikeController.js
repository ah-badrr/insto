import Like from "../models/LikeModel.js";

export const getLikes = async (req, res) => {
  try {
    const response = await Like.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getLikeById = async (req, res) => {
  try {
    const response = await Like.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getLikeByPost = async (req, res) => {
  try {
    const response = await Like.findAll({
      where: {
        postId: req.params.post,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getLikeByPostUser = async (req, res) => {
  try {
    const response = await Like.findAll({
      where: {
        postId: req.params.post,
        userId: req.params.user,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createLike = async (req, res) => {
  try {
    await Like.create(req.body);
    res.status(201).json({ msg: "Like Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLike = async (req, res) => {
  try {
    await Like.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Like Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteLike = async (req, res) => {
  try {
    await Like.destroy({
      where: {
        postId: req.params.post,
        userId: req.params.user
      },
    });
    res.status(200).json({ msg: "Like Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
