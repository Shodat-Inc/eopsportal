import { DataTypes } from "sequelize";
export function phoneRecord(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      userId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      countryCodeId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      phoneNumber: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      isPrimary: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    },
    countryCodeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "CountryCodeModels",
        id: "id",
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  };
  return sequelize.define("PhoneRecord", attributes);
}
