import { DataTypes } from "sequelize";

export function Image(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        modelDataId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ModelData",
                id: "id",
            },
            comment: "Foreign key referencing the associated ModelData. Indicates the ModelData to which the url belongs.",
        },
        url: { type: DataTypes.STRING, allowNull: false },
    };
    return sequelize.define("Image", attributes);
}
