import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Post = db.define(
  "posts",
  {
    userId: DataTypes.INTEGER,
    caption: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
    type: DataTypes.ENUM(['picture', 'video'])
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Post);
Post.belongsTo(User);

export default Post;

(async () => {
  await db.sync();
})();
