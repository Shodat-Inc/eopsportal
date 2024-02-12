import { DataTypes } from "sequelize";

export function CommentAttachment(sequelize: any) {
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

        commentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "TicketComments",
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

        enterpriseUserId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: "EnterpriseUsers",
                id: "id"
            }
        },
    };

    return sequelize.define("CommentAttachment", attributes);
}
