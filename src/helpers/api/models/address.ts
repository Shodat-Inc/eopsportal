import { DataTypes } from "sequelize";
export function Address(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      address: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      city: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean };
      state: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean };
      pincode: {
        type: DataTypes.IntegerDataTypeConstructor;
        allowNull: boolean;
      };
      country: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      userId: {
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
    address: { type: DataTypes.STRING, allowNull: false },
    city: { type: DataTypes.STRING, allowNull: true },
    state: { type: DataTypes.STRING, allowNull: true },
    pincode: { type: DataTypes.INTEGER, allowNull: true },
    country: { type: DataTypes.STRING, allowNull: true },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    },
  };
  return sequelize.define("Address", attributes);
}
