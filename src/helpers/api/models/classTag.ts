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
      classTagName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      classId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      classDatatypeId: {
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
    classTagName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tagDatatypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "tagDataType",
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

  return sequelize.define("TagDataType", attributes);
}
