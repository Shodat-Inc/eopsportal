import { DataTypes } from "sequelize";
import { TestProductionDataType } from "@/util/enums"

export function ModelData(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
            comment: "Unique identifier for the Image.",
        },
        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                id: "id",
            },
            comment: "Foreign key referencing the associated User. Indicates the User who is logged in and whose objectValues are being considered.",
        },
        modelId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Models",
                id: "id",
            },
            comment: "Foreign key referencing the associated Model. Indicates the Model for which the object values are stored.",
        },
        classId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Classes",
                id: "id",
            },
            comment: "Foreign key referencing the associated Class. Indicates the Class to which the image belongs.",
        },
        objectValueId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ObjectValues",
                id: "id",
            },
            comment: "Foreign key referencing the associated Object Value. Indicates the Object Value to which the image belongs.",

        },
        type: {
            type: TestProductionDataType,
            defaultValue: 'test'
        },
    };
    return sequelize.define("ModelData", attributes);
}
