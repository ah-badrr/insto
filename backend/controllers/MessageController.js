import Message from "../models/MessageModel.js";

export const getMessages = async (req, res) => {
  try {
    const response = await Message.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getMessageById = async (req, res) => {
  try {
    const response = await Message.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createMessage = async (req, res) => {
  try {
    await Message.create(req.body);
    res.status(201).json({ msg: "Message Created" });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateMessage = async (req, res) => {
  try {
    await Message.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Message Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteMessage = async (req, res) => {
  try {
    await Message.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Message Deleted" });
  } catch (error) {
    console.log(error.message);
  }
};
