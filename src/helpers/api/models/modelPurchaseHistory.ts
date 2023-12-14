import { DataTypes } from "sequelize";

export function Purchase(sequelize: any) {
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
                model: "Model",
                id: "id",
            },
        },
        modelPurchaseHistory: { type: DataTypes.DATE, allowNull: true },
        currentStatus: {
            type: DataTypes.ENUM('active', 'pending', 'inactive'),
            defaultValue: 'inactive',
        },
        expireDate: { type: DataTypes.DATE, allowNull: true, },
        modelId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Model",
                id: "id",
            },
        }
    };

    return sequelize.define("ModelPurchaseHistory", attributes);
}
