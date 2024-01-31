import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import * as models from "./models/index";
import { loggerInfo, loggerError } from "@/logger";
import { dialData } from "../seedData/countryCode";
import relationship from "./relation/relation";
import { Reasons } from "../seedData/reason";
import { TagDataType } from "../seedData/datatype";
import { routes } from "../seedData/route";
import { individualRole } from "../seedData/indvidualRole";
import { emailTemplates } from "../seedData/emailTemplate";
const { serverRuntimeConfig } = getConfig();
let sequelize;

export const db: any = {
  initialized: false,
  initialize,
  sequelize,
};
export interface Models {
  [key: string]: any;
  // ... other model typings
}

//Route Model

async function seedDemoRoutes(Routes: any) {
  for (let route of routes) {
    // Using findOrCreate to ensure the demo roles aren't duplicated
    await Routes.findOrCreate({
      where: { routeName: route.name },
      defaults: route,
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
async function seedDemoIndvidualRole(Role: any) {
  // Using findOrCreate to ensure the Dataypes aren't duplicated
  for (let a of individualRole) {
    await Role.findOrCreate({
      where: { name: a.name },
      defaults: a,
    });
  }
}
async function seedEmailTemplates(EmailTemplate: any) {
  for (let temps of emailTemplates) {
    await EmailTemplate.findOrCreate({
      where: { emailSubject: temps.emailSubject },
      defaults: temps,
    });
  }
}

export async function initialize() {
  loggerInfo.info("<+----|| DB connection ||-----+>");

  try {
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

    sequelize = new Sequelize(database, user, password, {
      dialect: "mysql",
      port,
      host,
    });
    // for (let key in models) {
    //   db[key] = (models as any)[key](sequelize);
    //   loggerInfo.info(key);
    // }\
    const modelArray: any = {
      countryData: "countryCodeModel",
      tagDataType: "tagDataType",
      routeTable: "Routes",
      role: "Role",
      address: "Address",
      phoneRecords: "phoneRecord",
      companyRecords: "companyRecord",
      user: "User",
      value: "AddValues",
      object: "object",
      classTag: "classTag",
      parentJoinKey: "parentJoinKey",
      class: "AddClasses",
      enterpriseUser: "EnterpriseUser",
      enterprise: "Enterprise",
      deleteTableRecord: "deleteRecord",
      reason: "Reason",
      otpverify: "otpVerify",
      contactSales: "ContactSale",
      enterpriseAddress: "EnterpriseAddress",
      invite: "Invite",
      aiModel: "Model",
      aiModelData: "ModelData",
      modelObjectImages: "Image",
      crackDetectionResponse: "CrackResponse",
      tyreDetectionResponse: "TyreResponse",
      subscription: "Subscription",
      purchaseHistory: "PurchaseHistory",
      alert: "Alert",
      emailTemplate: "EmailTemplate",
      modelRaisedAlert: "RaisedAlert",
      batteryAlert: "BatteryAlert",
      batteryDetectionResponse: "BatteryResponse",
      ticket: "Ticket",
    };

    if (true) {
      for (let key in modelArray) {
        const modelName = modelArray[key];
        const modelModule = await import(`./models/${key}.ts`);
        const model = modelModule[modelName](sequelize);
        db[modelName] = model;
        // loggerInfo.info(key, "Reached AT END");
      }
      // sync all models with database
      await relationship(db);

      if (isDBSync) {
        await sequelize.sync({ alter: true });
        if (db.Routes) {
          await seedDemoRoutes(db.Routes);
        }
        if (db.Role) {
          await seedDemoIndvidualRole(db.Role);
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
        if (db.EmailTemplate) {
          await seedEmailTemplates(db.EmailTemplate);
        }
      }
    }
    db.initialized = true;
    db.sequelize = sequelize;
  } catch (e) {
    loggerError.error(`db.ts`, e);
  }
}

// sequelize models with schema definitions
