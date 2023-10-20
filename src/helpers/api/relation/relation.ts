import { db } from "../db";

function relationship() {
  //user Relation
  db.User.hasMany(db.Address, { foreignKey: "userId" });
  db.Address.belongsTo(db.User, { foreignKey: "userId" });

  db.User.hasMany(db.phoneRecord, { foreignKey: "userId" });
  db.phoneRecord.belongsTo(db.User, { foreignKey: "userId" });

  db.User.hasOne(db.companyRecord, { foreignKey: "userId" });
  db.companyRecord.belongsTo(db.User, { foreignKey: "userId" });

  db.countryCodeModel.hasMany(db.Address, { foreignKey: "countryId" });
  db.Address.belongsTo(db.countryCodeModel, { foreignKey: "countryId" });

  db.countryCodeModel.hasMany(db.phoneRecord, { foreignKey: "countryCodeId" });
  db.phoneRecord.belongsTo(db.countryCodeModel, {
    foreignKey: "countryCodeId",
  });

  //class Relation
  db.User.hasMany(db.AddClasses, { foreignKey: "userId" });
  db.AddClasses.belongsTo(db.User, { foreignKey: "userId" });

  db.AddClasses.hasMany(db.classTag, { foreignKey: "classId" });
  db.classTag.belongsTo(db.AddClasses, { foreignKey: "classId" });

  db.AddClasses.hasMany(db.object, { foreignKey: "classId" });
  db.object.belongsTo(db.AddClasses, { foreignKey: "classId" });

  db.object.hasMany(db.AddValues, { foreignKey: "objectId" });
  db.AddValues.belongsTo(db.object, { foreignKey: "objectId" });

  db.classTag.hasMany(db.AddValues, { foreignKey: "classTagId" });
  db.AddValues.belongsTo(db.classTag, { foreignKey: "classTagId" });
}
export default relationship;
