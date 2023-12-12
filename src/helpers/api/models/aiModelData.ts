import { DataTypes } from "sequelize";

export function ModelData(sequelize: {
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
      className: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      subClassName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      modelName: {
        type: DataTypes.StringDataTypeConstructor;
        allowNull: boolean;
      };
      type: { type: DataTypes.StringDataTypeConstructor; allowNull: boolean };
      url: { type: DataTypes.AbstractDataTypeConstructor; allowNull: boolean };
      objectId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: {
          model: string;
          id: string;
        };
      };
      modelId: {
        type: DataTypes.IntegerDataTypeConstructor;
        references: {
          model: string;
          id: string;
        };
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
    userId: { type: DataTypes.INTEGER, allowNull: false },
    className: { type: DataTypes.STRING, allowNull: true },
    subClassName: { type: DataTypes.STRING, allowNull: true },
    modelName: { type: DataTypes.STRING, allowNull: true },
    type: { type: DataTypes.STRING, allowNull: false },
    url: { type: DataTypes.JSON, allowNull: false },
    objectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Objects",
        id: "id",
      },
    },
    modelId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Models",
        id: "id",
      },
    },
  };

  return sequelize.define("ModelData", attributes);
}
