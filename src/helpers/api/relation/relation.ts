import { db } from "../db";

function relationship() {
  // Establishing relationships for the User model:

  // Each User can have multiple Address records.
  db.User.hasMany(db.Address, { foreignKey: "userId" });
  // Each Address is associated with a single User.
  db.Address.belongsTo(db.User, { foreignKey: "userId" });

  // Each User can have multiple Phone records.
  db.User.hasMany(db.phoneRecord, { foreignKey: "userId" });
  // Each Phone record is associated with a single User.
  db.phoneRecord.belongsTo(db.User, { foreignKey: "userId" });

  // Each User can have one Company record.
  db.User.hasOne(db.companyRecord, { foreignKey: "userId" });
  // Each Company record is associated with a single User.
  db.companyRecord.belongsTo(db.User, { foreignKey: "userId" });

  // Establishing relationships for the Country Code model:

  // Each Country code can be associated with multiple Address records.
  db.countryCodeModel.hasMany(db.Address, { foreignKey: "countryId" });
  // Each Address can have a single Country code.
  db.Address.belongsTo(db.countryCodeModel, { foreignKey: "countryId" });

  // Each Country code can be associated with multiple Phone records.
  db.countryCodeModel.hasMany(db.phoneRecord, { foreignKey: "countryCodeId" });
  // Each Phone record can have a single Country code.
  db.phoneRecord.belongsTo(db.countryCodeModel, { foreignKey: "countryCodeId" });

  // Establishing relationships for the Classes:

  // Each User can create multiple classes.
  db.User.hasMany(db.AddClasses, { foreignKey: "userId" });
  // Each class is associated with a single User.
  db.AddClasses.belongsTo(db.User, { foreignKey: "userId" });

  // Each class can have multiple tags.
  db.AddClasses.hasMany(db.classTag, { foreignKey: "classId" });
  // Each tag is associated with a single class.
  db.classTag.belongsTo(db.AddClasses, { foreignKey: "classId" });

  // Each class can have multiple objects.
  db.AddClasses.hasMany(db.object, { foreignKey: "classId" });
  // Each object is associated with a single class.
  db.object.belongsTo(db.AddClasses, { foreignKey: "classId" });

  // Establishing relationships for the Objects:

  // Each object can have multiple values.
  db.object.hasMany(db.AddValues, { foreignKey: "objectId" });
  // Each value is associated with a single object.
  db.AddValues.belongsTo(db.object, { foreignKey: "objectId" });

  // Establishing relationships for the Tags:

  // Each tag can have multiple values.
  db.classTag.hasMany(db.AddValues, { foreignKey: "classTagId" });
  // Each value is associated with a single tag.
  db.AddValues.belongsTo(db.classTag, { foreignKey: "classTagId" });

  // Each object can have multiple tags.
  db.object.hasMany(db.classTag, { foreignKey: "classId" });
  // Each tag can be associated with multiple objects.
  db.classTag.belongsTo(db.object, { foreignKey: "classId" });
}

export default relationship;
