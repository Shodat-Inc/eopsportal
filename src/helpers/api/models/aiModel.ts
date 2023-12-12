import { DataTypes } from "sequelize";

export function Model(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    modelName: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.JSON, allowNull: true },
    associationId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ModelClassAssociations",
        id: "id",
      },
    },
  };
  return sequelize.define("Model", attributes);
}
