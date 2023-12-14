import { DataTypes } from "sequelize";

export function Association(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
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
    return sequelize.define("ModelClassAssociation", attributes);
}




