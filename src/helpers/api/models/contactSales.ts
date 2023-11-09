import { DataTypes } from "sequelize";

export function ContactSale(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    email: { type: DataTypes.STRING, allowNull: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: false },
    CIN: { type: DataTypes.INTEGER, allowNull: false },
    numOfEmployee: { type: DataTypes.INTEGER, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("ContactSale", attributes);
}
