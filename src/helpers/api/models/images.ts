import { DataTypes } from "sequelize";

export function Image(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        url: { type: DataTypes.STRING, allowNull: false },
        modelDataId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ModelData",
                id: "id",
            },
        },
    };
    return sequelize.define("Image", attributes);
}
