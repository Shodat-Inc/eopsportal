import { DataTypes } from "sequelize";

export function Response(sequelize: any, modelName: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        modelValuesId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ModelData",
                id: "id",
            },
            allowNull: false
        },
        response: {
            type: DataTypes.JSON,
            allowNull: true
        }
    };
    const dbModel =sequelize.define(modelName, attributes);
    return dbModel;
}
