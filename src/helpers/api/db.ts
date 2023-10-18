import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import * as models from "./models/index";
import { loggerInfo, loggerError } from "@/logger";
import { dialData } from "../countryCode";
const { serverRuntimeConfig } = getConfig();
export const db: any = {
  initialized: false,
  initialize,
};
export interface Models {
  [key: string]: any;
  // ... other model typings
}

//demo roll
async function seedDemoRoles(Role: any) {
  const demoRoles = [
    { name: "Admin", isActive: true },
    { name: "User", isActive: true },
    { name: "Guest", isActive: false },
  ];

  for (let role of demoRoles) {
    // Using findOrCreate to ensure the demo roles aren't duplicated
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  }
}

//demo Tag data
async function seedDemoTagDataType(tagDataType: any) {
  const demoTagDataType = [
    { name: "int", type: "int", description: "This is int", isActive: true },
    {
      name: "float",
      type: "float",
      description: "This is float",
      isActive: true,
    },
    { name: "bool", type: "bool", description: "This is bool", isActive: true },
    { name: "char", type: "char", description: "This is char", isActive: true },
    {
      name: "varchar",
      type: "varchar",
      description: "This is varchar",
      isActive: true,
    },
    {
      name: "string",
      type: "string",
      description: "This is string",
      isActive: true,
    },
    {
      name: "json",
      type: "json",
      description: "This is json",
      isActive: false,
    },
  ];
  for (let type of demoTagDataType) {
    // Using findOrCreate to ensure the demo roles aren't duplicated
    await tagDataType.findOrCreate({
      where: { name: type.name },
      defaults: type,
    });
  }
}

//country code data model

async function seedCountryCodeData(countryCodeModel: any) {
  for (let country of dialData) {
    await countryCodeModel.findOrCreate({
      where: { countryCode: country.countryCode },
      defaults: country,
    });
  }
}
// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  loggerInfo.info("<----db connection----->");

  try {
    // create db if it doesn't already exist
    const { host, port, user, password, database } =
      serverRuntimeConfig.dbConfig;
    const { isDBSync } = serverRuntimeConfig;

    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, {
      dialect: "mysql",
      port,
      host,
    });
    for (let key in models) {
      db[key] = (models as any)[key](sequelize);
      loggerInfo.error(key);
    }

    if (!db.initialized) {
      // sync all models with database

      // A user can have multiple addresses:
      db.User.hasMany(db.Address, { foreignKey: "userId" });
      // As Address table contains a userId, you should also define the reverse relationship:
      db.Address.belongsTo(db.User, { foreignKey: "userId" });

      db.User.hasMany(db.phoneRecord, { foreignKey: "userId" });
      // As phoneRecord table contains a userId, you should also define the reverse relationship:
      db.phoneRecord.belongsTo(db.User, { foreignKey: "userId" });

      db.User.hasOne(db.companyRecord, { foreignKey: "userId" });
      // As companyRecord table contains a userId, you should also define the reverse relationship:
      db.companyRecord.belongsTo(db.User, { foreignKey: "userId" });

      db.countryCodeModel.hasMany(db.Address, { foreignKey: "countryId" });
      db.Address.belongsTo(db.countryCodeModel, { foreignKey: "countryId" });

      db.countryCodeModel.hasMany(db.phoneRecord, {
        foreignKey: "countryCodeId",
      });
      db.phoneRecord.belongsTo(db.countryCodeModel, {
        foreignKey: "countryCodeId",
      });

      //demo role

      if (isDBSync) {
        await sequelize.sync({ alter: true });
        if (db.Role) {
          await seedDemoRoles(db.Role);
        }
        //demo tagDatatype
        if (db.tagDataType) {
          await seedDemoTagDataType(db.tagDataType);
        }
        //demo countryCode
        if (db.countryCodeModel) {
          await seedCountryCodeData(db.countryCodeModel);
        }
      }
    }

    db.initialized = true;
  } catch (e) {
    loggerError.error(`db.ts`, e);
  }
}

// sequelize models with schema definitions
