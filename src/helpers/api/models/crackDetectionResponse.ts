import { Data } from "@react-google-maps/api";
import { DataTypes } from "sequelize";

export function CrackResponse(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    coordinates: { type: DataTypes.JSON, allowNull: true },
    predictions: { type: DataTypes.STRING, allowNull: true },
    thresholdValue: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    probability: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageObjectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ImageObjectModels",
        id: "id",
      },
    },
  };
  return sequelize.define("CrackDetectionResponse", attributes);
}
