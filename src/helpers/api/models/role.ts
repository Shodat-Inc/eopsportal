import { DataTypes } from "sequelize";

export function Role(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      name: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean };
      isActive: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
      routeId: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
    }
  ) => any;
}) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    routeId: {
      type: DataTypes.JSON,
      allowNull: false
    },
  };

  return sequelize.define("Role", attributes);
}
