import { DataTypes } from "sequelize";

export function Link(sequelize: any) {
    const attributes = {
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
