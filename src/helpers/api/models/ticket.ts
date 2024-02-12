import { DataTypes } from "sequelize";
import { ticketStatus, priority, isFlagged, Severity } from "@/util/enums"

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

        severity: {
            type: Severity,
            allowNull: true,
            defaultValue: 'low'
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

        ticketRaisedAlertLinkId: {
            type: DataTypes.INTEGER,
            references: {
                model: "TicketRaisedAlertLinks",
                id: "id",
            },
            allowNull: true
        },

        completionDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

    };

    return sequelize.define("Ticket", attributes);
}
