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
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Classes",
        id: "id",
      },
    },
    objectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Objects",
        id: "id",
      },
    },
  };
  return sequelize.define("Model", attributes);
}
