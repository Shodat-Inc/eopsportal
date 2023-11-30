import { DataTypes } from "sequelize";

export function Invite(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, allowNull: true },
    userRole: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.TINYINT, allowNull: true, defaultValue: 0 },
    enterpriseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Enterprises",
        id: "id",
      },
      allowNull: true
    },
  };

  return sequelize.define("Invite", attributes);
}
