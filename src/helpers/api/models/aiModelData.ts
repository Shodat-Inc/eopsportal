import { DataTypes } from "sequelize";
export function ModelData(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        modelValues: { type: DataTypes.STRING, allowNull: false },
        objectId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Objects",
                id: "id",
            },
            allowNull: false
        },
    };
    return sequelize.define("ModelData", attributes);
}