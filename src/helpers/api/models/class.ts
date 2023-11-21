import { DataTypes } from "sequelize";

export function AddClasses(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      className: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      superParentId: {
        type: DataTypes.IntegerDataTypeConstructor;
        allowNull: boolean;
      };
      parentId: {
        type: DataTypes.IntegerDataTypeConstructor;
        allowNull: boolean;
      };
      userId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      enterpriseUserId: {
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
    className: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    superParentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },   
    enterpriseUserId: {
      type: DataTypes.INTEGER,
      references: { model: "EnterpriseUsers", id: "id" },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        id: "id",
      },
    },
  };

  return sequelize.define("Class", attributes);
}
