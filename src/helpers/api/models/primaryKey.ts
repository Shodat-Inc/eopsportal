import { DataTypes } from "sequelize";

export function PrimaryKey(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        classTagId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ClassTags",
                id: "id",
            },
            allowNull: true
        },

        userId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Users",
                id: "id",
            },
            allowNull: true
        },
    };

    return sequelize.define("PrimaryKey", attributes);
}
