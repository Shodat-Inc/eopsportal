import { DataTypes } from "sequelize";

export function BatteryResponse(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        response: { type: DataTypes.JSON, allowNull: true },
        tag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        modelObjectImageId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ModelObjectImages",
                id: "id",
            },
        },
    };
    return sequelize.define("BatteryDetectionResponse", attributes);
}
