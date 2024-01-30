// import { db } from "../db";

async function relationship(db: any) {
  // Establishing relationships for the User models:
  return new Promise((resolve, reject) => {
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

    //Each Role can have multiple users
    db.Role.hasMany(db.User, { foreignKey: "roleId" });

    //Each User is aasociated with one role id
    db.User.belongsTo(db.Role, { foreignKey: "roleId" });

    // Establishing relationships for the Country Code model:

    // Each Country code can be associated with multiple Address records.
    db.countryCodeModel.hasMany(db.Address, { foreignKey: "countryId" });
    // Each Address can have a single Country code.
    db.Address.belongsTo(db.countryCodeModel, { foreignKey: "countryId" });

    // Each Country code can be associated with multiple Phone records.
    db.countryCodeModel.hasMany(db.phoneRecord, {
      foreignKey: "countryCodeId",
    });
    // Each Phone record can have a single Country code.
    db.phoneRecord.belongsTo(db.countryCodeModel, {
      foreignKey: "countryCodeId",
    });

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
    // Each tag can be associated with single objects.
    db.classTag.belongsTo(db.object, { foreignKey: "classId" });

    //Each subclass can have multiple parent join key tags
    db.AddClasses.hasMany(db.parentJoinKey, { foreignKey: "classId" });
    // Each parent join key tags belongs to a class
    db.parentJoinKey.belongsTo(db.AddClasses, { foreignKey: "classId" });

    //Each parentJoinKey can have multiple classTag
    db.parentJoinKey.hasMany(db.classTag, { foreignKey: "classId" });
    // Each classTag belongs to a parentJoinKey
    db.classTag.belongsTo(db.parentJoinKey, { foreignKey: "classId" });

    //Each tagDataType can have multiple classTag
    db.tagDataType.hasMany(db.classTag, { foreignKey: "dataTypeId" });
    // Each classTag belongs to a tagDataType
    db.classTag.belongsTo(db.tagDataType, { foreignKey: "dataTypeId" });

    //<-------------------------------------------------- Enterprise Relations ------------------------------------------------------------------------------------------->

    db.Enterprise.hasMany(db.EnterpriseAddress, { foreignKey: "enterpriseId" });
    db.EnterpriseAddress.belongsTo(db.Enterprise, {
      foreignKey: "enterpriseId",
    });

    db.Role.hasMany(db.Routes);
    db.Routes.belongsTo(db.Role);

    db.Role.hasMany(db.EnterpriseUser, { foreignKey: "roleId" });
    db.EnterpriseUser.belongsTo(db.Role, { foreignKey: "roleId" });

    db.Enterprise.hasMany(db.EnterpriseUser, { foreignKey: "enterpriseId" });
    db.EnterpriseUser.belongsTo(db.Enterprise, { foreignKey: "enterpriseId" });

    db.Enterprise.hasMany(db.AddClasses, { foreignKey: "enterpriseId" });
    db.AddClasses.belongsTo(db.Enterprise, { foreignKey: "enterpriseId" });

    db.EnterpriseUser.hasMany(db.AddClasses, {
      foreignKey: "enterpriseUserId",
    });
    db.AddClasses.belongsTo(db.EnterpriseUser, {
      foreignKey: "enterpriseUserId",
    });

    db.Enterprise.hasMany(db.Invite, { foreignKey: "enterpriseId" });
    db.Invite.belongsTo(db.Enterprise, { foreignKey: "enterpriseId" });

    db.AddClasses.hasMany(db.ModelData, { foreignKey: "classId" });
    db.ModelData.belongsTo(db.AddClasses, { foreignKey: "classId" });

    db.object.hasMany(db.ModelData, { foreignKey: "objectId" });
    db.ModelData.belongsTo(db.object, { foreignKey: "objectId" });

    db.Model.hasMany(db.ModelData, { foreignKey: "modelId" });
    db.ModelData.belongsTo(db.Model, { foreignKey: "modelId" });

    db.ModelData.hasMany(db.Image, { foreignKey: "modelDataId" });
    db.Image.belongsTo(db.ModelData, { foreignKey: "modelDataId" });

    db.Image.hasMany(db.CrackResponse, { foreignKey: "modelObjectImageId" });
    db.CrackResponse.belongsTo(db.Image, { foreignKey: "modelObjectImageId" });

    db.Image.hasMany(db.TyreResponse, { foreignKey: "modelObjectImageId" });
    db.TyreResponse.belongsTo(db.Image, { foreignKey: "modelObjectImageId" });

    db.Model.hasMany(db.Subscription, { foreignKey: "modelId" });
    db.Subscription.belongsTo(db.Model, { foreignKey: "modelId" });

    db.User.hasMany(db.Subscription, { foreignKey: "userId" });
    db.Subscription.belongsTo(db.User, { foreignKey: "userId" });

    db.Model.hasMany(db.PurchaseHistory, { foreignKey: "modelId" });
    db.PurchaseHistory.belongsTo(db.Model, { foreignKey: "modelId" });

    db.User.hasMany(db.PurchaseHistory, { foreignKey: "userId" });
    db.PurchaseHistory.belongsTo(db.User, { foreignKey: "userId" });

    db.Subscription.hasMany(db.PurchaseHistory, {
      foreignKey: "subscriptionId",
    });
    db.PurchaseHistory.belongsTo(db.Subscription, {
      foreignKey: "subscriptionId",
    });

    db.User.hasMany(db.ModelData, { foreignKey: "userId" });
    db.ModelData.belongsTo(db.User, { foreignKey: "userId" });

    db.EmailTemplate.hasMany(db.Alert, { foreignKey: "emailTemplateId" })
    db.Alert.belongsTo(db.EmailTemplate, { foreignKey: "emailTemplateId" })

    db.Image.hasMany(db.RaisedAlert, { foreignKey: "modelObjectImageId" })
    db.RaisedAlert.belongsTo(db.Image, { foreignKey: "modelObjectImageId" })

    db.Image.belongsTo(db.ModelData, { foreignKey: "modelDataId" });
    db.ModelData.hasMany(db.Image, { foreignKey: "modelDataId" });

    db.Model.hasMany(db.RaisedAlert, { foreignKey: "modelId" });
    db.RaisedAlert.belongsTo(db.Model, { foreignKey: "modelId" });


    db.object.hasMany(db.RaisedAlert, { foreignKey: "objectId" });
    db.RaisedAlert.belongsTo(db.object, { foreignKey: "objectId" });

    db.Alert.hasMany(db.RaisedAlert, { foreignKey: "crackAlertId" });
    db.RaisedAlert.belongsTo(db.Alert, { foreignKey: "crackAlertId" })

    db.User.hasMany(db.Alert, { foreignKey: "userId" })
    db.Alert.belongsTo(db.User, { foreignKey: "userId" })

    db.Enterprise.hasMany(db.Alert, { foreignKey: "enterpriseId" })
    db.Alert.belongsTo(db.Enterprise, { foreignKey: "enterpriseId" })

    db.EnterpriseUser.hasMany(db.Alert, { foreignKey: "enterpriseUserId" })
    db.Alert.belongsTo(db.Alert, { foreignKey: "enterpriseId" })

    db.AddClasses.hasMany(db.RaisedAlert, { foreignKey: "classId" })
    db.RaisedAlert.belongsTo(db.AddClasses, { foreignKey: "classId" })

    db.Image.hasMany(db.Alert, { foreignKey: "modelObjectImageId" })
    db.Alert.belongsTo(db.Image, { foreignKey: "modelObjectImageId" })

    db.User.hasMany(db.Alert, { foreignKey: "userId" })
    db.Alert.belongsTo(db.User, { foreignKey: "userId" })

    db.Image.hasMany(db.BatteryResponse, { foreignKey: "modelObjectImageId" })
    db.BatteryResponse.belongsTo(db.Image, { foreignKey: "modelObjectImageId" })

    db.Image.hasMany(db.BatteryAlert, { foreignKey: "modelObjectImageId" })
    db.BatteryAlert.belongsTo(db.Image, { foreignKey: "modelObjectImageId" })

    db.User.hasMany(db.BatteryAlert, { foreignKey: "userId" })
    db.BatteryAlert.belongsTo(db.User, { foreignKey: "userId" })

    db.EnterpriseUser.hasMany(db.BatteryAlert, { foreignKey: "enterpriseUserId" })
    db.BatteryAlert.belongsTo(db.EnterpriseUser, { foreignKey: "enterpriseUserId" })

    db.Enterprise.hasMany(db.BatteryAlert, { foreignKey: "enterpriseId" })
    db.BatteryAlert.belongsTo(db.Enterprise, { foreignKey: "enterpriseId" })

    db.BatteryAlert.hasMany(db.RaisedAlert, { foreignKey: "batteryAlertId" });
    db.RaisedAlert.belongsTo(db.BatteryAlert, { foreignKey: "batteryAlertId" })


    resolve("Imported");
  });
}
export default relationship;
