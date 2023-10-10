import { DataTypes } from "sequelize";

export function User(sequelize: any) {
  const attributes = {
    username: { type: DataTypes.STRING, allowNull: false },
    firstName: { type: DataTypes.STRING, allowNull: false },
    emailAddress: { type: DataTypes.STRING, allowNull: true },
    lastName: { type: DataTypes.STRING, allowNull: false },
    companyName: { type: DataTypes.STRING, allowNull: false },
    countryCode: { type: DataTypes.STRING, allowNull: true },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    terms: { type: DataTypes.BOOLEAN, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        id: "id",
      },
    },
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

  return sequelize.define("User", attributes, options);
}
