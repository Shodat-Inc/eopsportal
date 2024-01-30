import { DataTypes } from "sequelize";

export function RaisedAlert(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },

        tags: {
            type: DataTypes.STRING,
            allowNull: false
        },

        modelObjectImageId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        modelId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        userId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        classId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        objectId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        triggeredProbability: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        crackAlertId: {
            type: DataTypes.INTEGER,
            references: {
                model: "CrackAlerts",
                id: "id",
            },
        },

        batteryAlertId: {
            type: DataTypes.INTEGER,
            references: {
                model: "BatteryAlerts",
                id: "id",
            },
        }

    };

    return sequelize.define("RaisedAlert", attributes);
}
