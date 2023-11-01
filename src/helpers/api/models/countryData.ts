import { DataTypes } from "sequelize";

export function countryCodeModel(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      countryName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      dialCode: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      countryCode: {
        type: DataTypes.StringDataTypeConstructor;
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
    countryName: { type: DataTypes.STRING, allowNull: false },
    countryCode: { type: DataTypes.STRING, allowNull: false },
    dialCode: { type: DataTypes.STRING, allowNull: false },
  };

  return sequelize.define("CountryCodeModel", attributes);
}
