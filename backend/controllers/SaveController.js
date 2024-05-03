import Post from "../models/PostModel.js";
import Save from "../models/SaveModel.js";
import User from "../models/UserModel.js";

export const getSaves = async (req, res) => {
  try {
    const response = await Save.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSaveById = async (req, res) => {
  try {
    const response = await Save.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSaveByUser = async (req, res) => {
  try {
    const response = await Save.findAll({
      where: {
        userId: req.params.user,
      }, include:[Post]
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSaveByPost = async (req, res) => {
  try {
    const response = await Save.findAll({
      where: {
        postId: req.params.post,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getSaveByPostUser = async (req, res) => {
  try {
    const response = await Save.findAll({
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

export const createSave = async (req, res) => {
  try {
    await Save.create(req.body);
    res.status(201).json({ msg: "Save Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSave = async (req, res) => {
  try {
    await Save.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Save Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteSave = async (req, res) => {
  try {
    await Save.destroy({
      where: {
        postId: req.params.post,
        userId: req.params.user,
      },
    });
    res.status(200).json({ msg: "Save Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
