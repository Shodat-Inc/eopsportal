import { DataTypes } from "sequelize";
import { ActiveInactiveDataType, OnOffDataType } from "@/util/enums";

export function Subscription(sequelize: any) {
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
            comment: "Foreign key referencing the associated User. Represents the user whose subscription data is saved.",
        },
        modelId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Models",
                id: "id",
            },
            comment: "Foreign key referencing the associated Model. Indicates the model for which the user has taken a subscription.",
        },
        status: {
            type: ActiveInactiveDataType,
            defaultValue: 'inactive'
        },
        autoRenew: {
            type: OnOffDataType,
            defaultValue: 'off',
            comment: "Indicates whether the user has opted for automatic subscription renewal. 'on' means auto-renewal is enabled, 'off' means it's disabled.",
        },
        expireDate: {
            type: DataTypes.DATE,
            allowNull: false,
            comment: "Date when the subscription is set to expire.",
        },
    };
    return sequelize.define("Subscription", attributes);
}
