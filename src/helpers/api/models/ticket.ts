import { DataTypes } from "sequelize";
import { ticketStatus, priority, isFlagged } from "@/util/enums"

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

        assignedTo: {
            type: DataTypes.STRING,
            allowNull: false
        },

        assignedBy: {
            type: DataTypes.STRING,
            allowNull: false
        },

        ticketPoints: {
            type: DataTypes.INTEGER,
            allowNull: true
        },

        isFlagged: {
            type: isFlagged,
            defaultValue: 'false'
        },

        blockedBy: {
            type: DataTypes.STRING,
            allowNull: true
        },

        linkedTicket: {
            type: DataTypes.JSON,
            allowNull: true
        },

        completionDate: {
            type: DataTypes.DATEONLY,
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
