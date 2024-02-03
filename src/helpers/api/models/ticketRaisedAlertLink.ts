import { DataTypes } from "sequelize";

export function Link(sequelize: any) {
  const attributes = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tickets",
        id: "id",
      },
      allowNull: true,
    },
    raisedAlertId: {
      type: DataTypes.INTEGER,
      references: {
        model: "RaisedAlerts",
        id: "id",
      },
      allowNull: true,
    },
  };

  return sequelize.define("TicketRaisedAlertLink", attributes);
}
