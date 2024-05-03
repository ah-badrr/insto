import { Sequelize } from "sequelize";

const db = new Sequelize("insta_api", "root", "bismillah", {
  host: "localhost",
  dialect: "mysql",
});



export default db;
