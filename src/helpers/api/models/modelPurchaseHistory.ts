import { DataTypes } from "sequelize";

export function Purchase(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        modelPurchaseHistory: { type: DataTypes.STRING, allowNull: true },
        currentStatus: { type: DataTypes.BOOLEAN, allowNull: true },
        expireDate: { type: DataTypes.DATE, allowNull: true, },
        modelId:{
            type: DataTypes.INTEGER,
            references: {
                model: "Model",
                id: "id",
            },
            allowNull: true
        }
    };

    return sequelize.define("ModelPurchaseHistory", attributes);
}
