import { DataTypes } from "sequelize";

export function Response(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        imageObjectId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ImageObjectModels",
                id: "id",
            },
        },
        response: {
            type: DataTypes.JSON,
            allowNull: true
        }
    };
    return sequelize.define("ResponseData", attributes);
}
