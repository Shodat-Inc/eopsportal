import { DataTypes } from "sequelize";

export function tagDataType(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      tagName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      tagType: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      tagDescription: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      isActive: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
    }
  ) => any;
}) {
  const attributes: any = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  };

  return sequelize.define("TagDataType", attributes);
}
