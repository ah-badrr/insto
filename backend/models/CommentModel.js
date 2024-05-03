import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./PostModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Comment = db.define(
  "comments",
  {
    postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    comment: DataTypes.STRING
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Comment);
Post.hasMany(Comment);
Comment.belongsTo(User);
Comment.belongsTo(Post);

export default Comment;

(async () => {
  await db.sync();
})();
