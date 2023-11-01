import { DataTypes } from "sequelize";
export function companyRecord(sequelize: {
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
      companyName: {
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  return sequelize.define("CompanyRecord", attributes);
}
