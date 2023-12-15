import { DataTypes } from "sequelize";

export function Subscription(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'inactive'
        },
        expireDate: { type: DataTypes.DATE, allowNull: false },
        autoRenew: {
            type: DataTypes.ENUM('on', 'off'),
            defaultValue: 'off'
        },
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
        }
    };
    return sequelize.define("Subscription", attributes);
}
