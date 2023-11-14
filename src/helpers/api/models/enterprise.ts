import { DataTypes } from "sequelize";

export function Enterprise(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    enterpriseName: { type: DataTypes.STRING, allowNull: false },
    employeeCount: { type: DataTypes.INTEGER, allowNull: false },
  };

  return sequelize.define("Enterprise", attributes);
}
