import { DataTypes } from "sequelize";

export function RaisedAlert(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    modelObjectImageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "ModelObjectImages",
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
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
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

    objectId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Objects",
        id: "id",
      },
    },

    alertId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    alertTableName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    responseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tableName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticketRaisedAlertLinkId: {
      type: DataTypes.INTEGER,
      references: {
        model: "TicketRaisedAlertLinks",
        id: "id",
      },
    },
  };

  return sequelize.define("RaisedAlert", attributes);
}
