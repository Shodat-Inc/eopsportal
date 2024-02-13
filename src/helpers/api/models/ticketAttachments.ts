import { DataTypes } from "sequelize";

export function Attachment(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        fileName: {
            type: DataTypes.STRING,
            allowNull: true,
        },

        fileUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        fileType: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Tickets",
                id: "id"
            }
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Users",
                id: "id"
            }
        },
        enterpriseId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "Enterprises",
                id: "id"
            }
        },
    };

    return sequelize.define("TicketAttachment", attributes);
}
