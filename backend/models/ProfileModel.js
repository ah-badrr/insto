import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Profile = db.define(
  "profiles",
  {
    userId: DataTypes.INTEGER,
    bio: DataTypes.STRING,
    job: DataTypes.STRING,
    image: DataTypes.STRING,
    url: DataTypes.STRING,
  },
  {
    freezeTableName: true,
  }
);
User.hasOne(Profile);
Profile.belongsTo(User);

export default Profile;

(async () => {
  await db.sync();
})();
