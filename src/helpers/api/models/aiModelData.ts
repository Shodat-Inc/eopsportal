import { DataTypes } from "sequelize";

export function ModelData(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    modelValues: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.JSON, allowNull: false },
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
    modelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Models",
        id: "id",
      },
    },
  };

  return sequelize.define("ModelData", attributes);
}
