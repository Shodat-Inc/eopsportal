import { DataTypes } from "sequelize";
export function classTag(sequelize: {
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
      classId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      dataTypeId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
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
    tagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dataTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "TagDataTypes",
        id: "id",
      },
    },
    classId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Classes",
        id: "id",
      },
    },
  };

  return sequelize.define("ClassTag", attributes);
}
