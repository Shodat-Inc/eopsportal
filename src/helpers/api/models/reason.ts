import { DataTypes } from "sequelize";

export function Reason(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      Reason: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean };
      isActive: {
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
    Reason: { type: DataTypes.STRING, allowNull: false },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  };

  return sequelize.define("Reason", attributes);
}
