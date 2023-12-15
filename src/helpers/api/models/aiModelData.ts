import { DataTypes } from "sequelize";

export function ModelData(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.ENUM('test', 'production'),
            defaultValue: 'test'
        },
        classId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Classes",
                id: "id",
            },
        },
        objectValueId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ObjectValues",
                id: "id",
            },
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
                id: "id",
            },
        },
    };
    return sequelize.define("ModelData", attributes);
}
