import { DataTypes } from "sequelize";
import { Condition, LessGreaterThan } from "@/util/enums";

export function TyreAlerts(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    alertName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recommendation: {
      type: Condition,
      defaultValue: "No",
    },
    distanceRange: {
      type: LessGreaterThan,
      defaultValue: "lessThan",
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    receiverEmailAddresses: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    modelObjectImageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ModelObjectImages",
        id: "id",
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    },
    enterpriseUserId: {
      type: DataTypes.INTEGER,
      references: {
        model: "EnterpriseUsers",
        id: "id",
      },
    },
    enterpriseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Enterprises",
        id: "id",
      },
    },
    emailTemplateId: {
      type: DataTypes.INTEGER,
      references: {
        model: "EmailTemplates",
        id: "id",
      },
    },
  };

  return sequelize.define("TyreAlert", attributes);
}