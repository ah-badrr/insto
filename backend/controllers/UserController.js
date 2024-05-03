import Message from "../models/MessageModel.js";
import Post from "../models/PostModel.js";
import Profile from "../models/ProfileModel.js";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({ include: [Profile, Message, Post] });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: [Profile, Message, Post],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getUserByName = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        username: req.params.name,
      },
      include: [Profile, Message, Post],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createUser = async (req, res) => {
  try {
    await User.create(req.body);
    res.status(201).json({ msg: "User Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const userLogin = async (req, res) => {
  try {
    const response = await User.findOne({
      where: {
        username: req.params.username,
        password: req.params.password,
      },
    });
    if (response) {
      res.status(200).json({ Login: true, Data: response });
    } else {
      res.json({ Login: false });
    }
  } catch (error) {
    res.json({ Login: false });
    console.log(error.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
