import { DataTypes } from "sequelize";

export function Enterprise(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    phoneCode: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
    isPrimary: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("Enterprise", attributes);
}
