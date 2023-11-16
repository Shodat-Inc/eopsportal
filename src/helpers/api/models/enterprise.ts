import { DataTypes } from "sequelize";
export function Enterprise(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      enterpriseName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      enterpriseIndustry: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      founderYear: {
        allowNull: boolean;
        type: DataTypes.IntegerDataTypeConstructor;
      };
      website: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      description: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      employeeCount: {
        type: DataTypes.IntegerDataTypeConstructor;
        allowNull: boolean;
      };
      superAdminName: {
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
    enterpriseName: { type: DataTypes.STRING, allowNull: true },
    enterpriseIndustry: { type: DataTypes.STRING, allowNull: true },
    founderYear: { type: DataTypes.INTEGER, allowNull: true },
    website: { type: DataTypes.STRING, allowNull: true },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    employeeCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    superAdminName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  };
  return sequelize.define("Enterprise", attributes);
}
