import { DataTypes } from "sequelize";

export function object(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      serialId: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      classId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      superParentId: {
        type: DataTypes.IntegerDataTypeConstructor;
        allowNull: boolean;
      };
      parentId: {
        type: DataTypes.IntegerDataTypeConstructor;
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
    serialId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Classes",
        id: "id",
      },
    },
    superParentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    parentId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  };

  return sequelize.define("Object", attributes);
}
