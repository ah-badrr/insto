import Message from "../models/MessageModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import path from "path";
import fs from "fs";

export const getUsers = async (req, res) => {
  try {
    const response = await User.findAll({ include: [Message, Post] });
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
      include: [Message, Post],
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
      include: [Message, Post],
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
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
  const username = req.body.username;
  const password = req.body.password;
  const bio = req.body.bio;
  const job = req.body.job;

  if (req.files) {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + req.params.id + ext;
    const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
    const allowedType = [".png", ".jpg", ".jpeg"];
    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
    if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });

    if (user.image != null) {
      const filepath = `./public/images/${user.image}`;
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    try {
      await User.update(
        { username: username, password: password, bio: bio, job: job, image: fileName, url: url },
        {
          where: {
            id: req.params.id,
          },
        }
      );
      res.status(200).json({ msg: "User Updated Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  }
  try {
    await User.update(
      { username: username, password: password, bio: bio, job: job },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${user.image}`;
    fs.unlinkSync(filepath);
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
