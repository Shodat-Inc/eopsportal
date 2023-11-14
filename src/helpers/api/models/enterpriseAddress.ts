import { DataTypes } from "sequelize";

export function EnterpriseAddress(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: false },
    pincode: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    enterpriseId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Enterprises",
        id: "id",
      },
    },
  };

  return sequelize.define("EnterpriseAddress", attributes);
}
