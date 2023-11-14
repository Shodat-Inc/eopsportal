import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import * as models from "./models/index";
import { loggerInfo, loggerError } from "@/logger";
import { dialData } from "../seedData/countryCode";
import relationship from "./relation/relation";
import { roles } from "../seedData/role";
import { Reasons } from "../seedData/reason";
import { TagDataType } from "../seedData/datatype";
const { serverRuntimeConfig } = getConfig();
export const db: any = {
  initialized: false,
  initialize,
};
export interface Models {
  [key: string]: any;
  // ... other model typings
}

//Roles Model
async function seedDemoRoles(Role: any) {
  for (let role of roles) {
    // Using findOrCreate to ensure the demo roles aren't duplicated
    await Role.findOrCreate({
      where: { name: role.name },
      defaults: role,
    });
  }
}

//Reason model

async function seedDemoReasons(Reason: any) {
  for (let a of Reasons) {
    // Using findOrCreate to ensure the demo reason aren't duplicated
    await Reason.findOrCreate({
      where: { reason: a.Reason },
      defaults: a,
    });
  }
}

//Tag datatype Model
async function seedDemoTagDataType(tagDataType: any) {
  for (let type of TagDataType) {
    // Using findOrCreate to ensure the Dataypes aren't duplicated
    await tagDataType.findOrCreate({
      where: { name: type.name },
      defaults: type,
    });
  }
}

//Country code data Model

async function seedCountryCodeData(countryCodeModel: any) {
  for (let country of dialData) {
    // Using findOrCreate to ensure the Country Codes aren't duplicated
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
      loggerInfo.info(key);
    }

    if (!db.initialized) {
      // sync all models with database
      relationship();

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
        if (db.Reason) {
          await seedDemoReasons(db.Reason);
        }
      }
    }

    db.initialized = true;
  } catch (e) {
    loggerError.error(`db.ts`, e);
  }
}

// sequelize models with schema definitions