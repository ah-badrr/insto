import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./PostModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Save = db.define(
  "saves",
  {
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Save);
Post.hasMany(Save);
Save.belongsTo(User);
Save.belongsTo(Post);

export default Save;

(async () => {
  await db.sync();
})();
