import { DataTypes } from "sequelize";

export function Assets(sequelize) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    assetId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    asssetName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assetkey: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    assetTypes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    tags: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  };

  const options = {
    scopes: {
      // include hash with this scope
      withHash: { attributes: {} },
    },
  };

  return sequelize.define("Assets", attributes, options);
}
