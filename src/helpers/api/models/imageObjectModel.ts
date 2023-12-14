import { DataTypes } from "sequelize";

export function ImageObject(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        url: { type: DataTypes.STRING, allowNull: false },
        type: {
            type: DataTypes.ENUM('test', 'production'),
            defaultValue: 'test',
        },
        imageRanCount: {
            type: DataTypes.INTEGER,
        },
        classId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Classes",
                id: "id",
            },
        },
        objectId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Objects",
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
    };

    return sequelize.define("ImageObjectModel", attributes);
}
