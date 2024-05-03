import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./PostModel.js";
import User from "./UserModel.js";
import Comment from "./CommentModel.js";
const { DataTypes } = Sequelize;

const Like = db.define(
  "likes",
  {
    postId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
Comment.hasMany(Like);
User.hasMany(Like);
Post.hasMany(Like);
Like.belongsTo(Comment);
Like.belongsTo(User);
Like.belongsTo(Post);

export default Like;

(async () => {
  await db.sync();
})();
