import { DataTypes } from "sequelize";

export function deleteRecord(sequelize: {
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
        allowNull: boolean;
      };
      email: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      deleteAction: {
        type: DataTypes.AbstractDataTypeConstructor;
        allowNull: boolean;
      };
      message: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      reasonId: {
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deleteAction: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    reasonId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Reasons",
        id: "id",
      },
    },
  };

  return sequelize.define("DeleteTableRecord", attributes);
}
