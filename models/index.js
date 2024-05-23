import Sequelize from "sequelize";
import fs from "fs";
import path from "path";

import {
  DATABASE_NAME,
  DATABASE_HOST,
  DATABASE_PASSWORD,
  DATABASE_USER,
} from "../config/index.js";

const configureModels = async () => {
  const sequelize = new Sequelize(
    DATABASE_NAME,
    DATABASE_USER,
    DATABASE_PASSWORD,
    {
      dialect: "postgres",
      host: DATABASE_HOST,
    }
  );

  const filename = import.meta.url;
  const dirname = "./models";

  // const dirname = path.dirname(filename);
  const basename = path.basename(filename);

  const db = {};

  await sequelize.authenticate();
  console.log("connected to DB");

  const files = fs
    .readdirSync(dirname)
    .filter(
      (file) =>
        file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );

  for (const file of files) {
    const filePath = `./${file}`;

    let model = await import(filePath); // Update './path_to_folder/' with your actual folder path

    model = model.default(sequelize, Sequelize.DataTypes);

    db[model.name] = model;
  }

  db.sequelize = sequelize;
  return db;
};

export default configureModels;
