import { DataTypes } from "sequelize";

export function Response(sequelize: any) {
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
    return sequelize.define("ResponseData", attributes);
}
