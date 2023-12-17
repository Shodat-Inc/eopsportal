import { ActiveInactiveDataType } from "@/util/enums";
import { DataTypes } from "sequelize";

export function PurchaseHistory(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                id: "id"
            },
            comment: "Foreign key referencing the associated User. Represents the user whose purchased history is saved.",
        },
        modelId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Models",
                id: "id",
            },
            comment: "Foreign key referencing the associated Model. Indicates the model for which the purchase history is being recorded.",
        },
        subscriptionId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Subscriptions",
                id: "id",
            },
            comment: "Foreign key referencing the associated Subscription. Indicates the subscription for which the user has made a purchase, recorded in the purchase history table for future reference.",
        },
        status: {
            type: ActiveInactiveDataType,
            defaultValue: 'inactive'
        },
        expireDate: { type: DataTypes.DATE, allowNull: false },
    };
    return sequelize.define("PurchaseHistory", attributes);
}
