import { DataTypes } from "sequelize";

export function AddValues(sequelize: {
  define: (
    arg0: string,
    arg1: {
      id: {
        type: DataTypes.IntegerDataTypeConstructor;
        primaryKey: boolean;
        allowNull: boolean;
        autoIncrement: boolean;
      };
      values: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      classTagId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: { model: string; id: string };
      };
      objectId: {
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
    values: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    classTagId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ClassTags",
        id: "id",
      },
    },
    objectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Objects",
        id: "id",
      },
    },
  };

  return sequelize.define("objectValues", attributes);
}
