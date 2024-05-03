import Profile from "../models/ProfileModel.js";
import path from "path";
import fs from "fs";
import User from "../models/UserModel.js";

export const getProfiles = async (req, res) => {
  try {
    const response = await Profile.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfileById = async (req, res) => {
  try {
    const response = await Profile.findOne({
      where: {
        id: req.params.id,
      },
      include: [User],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getProfileByUser = async (req, res) => {
  try {
    const response = await Profile.findOne({
      where: {
        userId: req.params.user,
      },
      include: [User],
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createProfile = async (req, res) => {
  try {
    await Profile.create(req.body);
    res.status(201).json({ msg: "Profile Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateProfile = async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      userId: req.params.id,
    },
  });
  if (!profile) return res.status(404).json({ msg: "No Data Found" });
  let fileName = "";
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

    if (profile.image != null) {
      const filepath = `./public/images/${profile.image}`;
      fs.unlinkSync(filepath);
    }

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
    try {
      await Profile.update(
        { bio: bio, job: job, image: fileName, url: url },
        {
          where: {
            userId: req.params.id,
          },
        }
      );
      res.status(200).json({ msg: "Profile Updated Successfully" });
    } catch (error) {
      console.log(error.message);
    }
  }
  try {
    await Profile.update(
      { bio: bio, job: job },
      {
        where: {
          userId: req.params.id,
        },
      }
    );
    res.status(200).json({ msg: "Profile Updated Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteProfile = async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      userId: req.params.id,
    },
  });
  if (!profile) return res.status(404).json({ msg: "No Data Found" });
  try {
    const filepath = `./public/images/${profile.image}`;
    fs.unlinkSync(filepath);
    await Profile.destroy({
      where: {
        userId: req.params.id,
      },
    });
    res.status(200).json({ msg: "Profile Deleted Successfully" });
  } catch (error) {
    console.log(error.message);
  }
};
