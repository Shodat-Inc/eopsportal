import { DataTypes } from "sequelize";
export function Routes(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      routeName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      isActive: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
      roleId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
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
    routeName: { type: DataTypes.STRING, allowNull: false },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Roles",
        id: "id",
      },
    },
  };

  return sequelize.define("Routes", attributes);
}