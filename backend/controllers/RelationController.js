import Relation from "../models/RelationModel.js";

export const getRelations = async (req, res) => {
  try {
    const response = await Relation.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRelationById = async (req, res) => {
  try {
    const response = await Relation.findAll({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFollower = async (req, res) => {
  try {
    const response = await Relation.findAll({
      where: {
        userId: req.params.userId,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getFollowed = async (req, res) => {
  try {
    const response = await Relation.findAll({
      where: {
        followed: req.params.followed,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getRelationByFF = async (req, res) => {
  try {
    const response = await Relation.findAll({
      where: {
        userId: req.params.userId,
        followed: req.params.followed,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createRelation = async (req, res) => {
  try {
    await Relation.create(req.body);
    res.status(201).json({ msg: "Relation Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRelation = async (req, res) => {
  try {
    await Relation.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Relation Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteRelation = async (req, res) => {
  try {
    await Relation.destroy({
      where: {
        userId: req.params.userId,
        followed: req.params.followed,
      },
    });
    res.status(200).json({ msg: "Relation Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
