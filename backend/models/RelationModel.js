import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Post from "./PostModel.js";
import User from "./UserModel.js";

const { DataTypes } = Sequelize;

const Relation = db.define(
  "relations",
  {
    userId: DataTypes.INTEGER,
    followed: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);
User.hasMany(Relation, {foreignKey: 'userId'});
User.hasMany(Relation, { foreignKey: "followed" });
Relation.belongsTo(User);

export default Relation;

(async () => {
  await db.sync();
})();
