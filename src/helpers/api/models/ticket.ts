import { DataTypes } from "sequelize";
import { ticketStatus, priority } from "@/util/enums"

export function Ticket(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: ticketStatus,
            defaultValue: 'open'
        },

        priority: {
            type: priority,
            defaultValue: 'low'
        },

        currentlyAssignedTo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        assignedBy: {
            type: DataTypes.STRING,
            allowNull: false
        },

        raisedAlertId: {
            type: DataTypes.INTEGER,
            references: {
                model: "RaisedAlerts",
                id: "id",
            },
        },

    };

    return sequelize.define("Ticket", attributes);
}
