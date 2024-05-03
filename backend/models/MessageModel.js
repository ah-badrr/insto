import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Message = db.define(
  "messages",
  {
    userId: DataTypes.INTEGER,
    toId: DataTypes.INTEGER,
    message: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Message);
Message.belongsTo(User);

export default Message;

(async () => {
  await db.sync();
})();
