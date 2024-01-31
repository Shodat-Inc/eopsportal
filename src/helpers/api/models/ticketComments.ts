import { DataTypes } from "sequelize";

export function Comment(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        text: {
            type: DataTypes.TEXT,
            allowNull: true,
        },

        parentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        ticketId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Tickets",
                id: "id",
            },
            allowNull: true,
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

        enterpriseUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "EnterpriseUsers",
                id: "id"
            }
        }

    };

    return sequelize.define("TicketComments", attributes);
}
