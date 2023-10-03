import getConfig from "next/config";
import mysql from "mysql2";
import { Sequelize, DataTypes } from "sequelize";

const { serverRuntimeConfig } = getConfig();

export const db = {
  initialized: false,
  initialize,
};

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
    port,
    host
  });

  // init models and add them to the exported db object
  db.User = userModel(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });

  db.initialized = true;
}

// sequelize models with schema definitions

function userModel(sequelize) {
  const attributes = {
    username: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    emailAddress: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
    terms: { type: DataTypes.BOOLEAN, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    pincode: { type: DataTypes.INTEGER, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("User", attributes, options);
}
