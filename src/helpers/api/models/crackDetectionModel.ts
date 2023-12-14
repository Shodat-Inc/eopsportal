import { DataTypes } from "sequelize";

export function CrackModel(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    modelName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.JSON, allowNull: true },
  };
  return sequelize.define("CrackDetectionModel", attributes);
}
