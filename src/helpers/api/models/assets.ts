import { DataTypes } from "sequelize";

export function Assets(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        autoIncrement: boolean;
      };
      assetId: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      asssetName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      slug: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean };
      assetkey: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
      assetTypes: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
      tags: { type: DataTypes.AbstractDataTypeConstructor; allowNull: boolean };
    },
    arg2: {
      scopes: {
        // include hash with this scope
        withHash: { attributes: {} };
      };
    }
  ) => any;
}) {
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
