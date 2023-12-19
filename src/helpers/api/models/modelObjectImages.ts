import { DataTypes } from "sequelize";
import { TestProductionDataType } from "@/util/enums"

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
        type: {
            type: TestProductionDataType,
            defaultValue: 'test'
        },
        url: { type: DataTypes.STRING, allowNull: false },
        testRanCount: { type: DataTypes.INTEGER, allowNull: true },        
    };
    return sequelize.define("ModelObjectImage", attributes);
}
