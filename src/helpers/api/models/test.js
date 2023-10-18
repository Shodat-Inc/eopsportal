


import { DataTypes } from "sequelize";

export function Test(sequelize) {
  const attributes = {
    username: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    emailAddress: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
    terms: { type: DataTypes.BOOLEAN, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    pincode: { type: DataTypes.INTEGER, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    defaultScope: {
      // exclude password hash by default
      attributes: { exclude: ["hash"] },
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("Test", attributes, options);
}