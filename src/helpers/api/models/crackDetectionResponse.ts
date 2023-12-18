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
    tag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    modelObjectImageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ModelObjectImages",
        id: "id",
      },
    },
  };
  return sequelize.define("CrackDetectionResponse", attributes);
}
