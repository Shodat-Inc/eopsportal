import { DataTypes } from "sequelize";

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
            },
        },
        objectId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Objects",
                id: "id",
            },
            comment: "Foreign key referencing the associated Object. Indicates the Model for which the object id is stored.",
        },
        classId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Classes",
                id: "id",
            },
            comment: "Foreign key referencing the associated Class. Indicates the Class to which the image belongs.",
        },
        
    };
    return sequelize.define("ModelData", attributes);
}
