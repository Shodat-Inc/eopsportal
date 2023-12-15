import { DataTypes } from "sequelize";

export function PurchaseHistory(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        currentStatus: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'inactive'
        },
        expireDate: { type: DataTypes.DATE, allowNull: false },
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
                id: "id"
            }
        },
        subscriptionId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Subscriptions",
                id: "id",
            },
        },
    };
    return sequelize.define("PurchaseHistory", attributes);
}
