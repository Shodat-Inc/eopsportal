import { DataTypes } from "sequelize";

export function Alert(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        alertName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        thresholdValue: { type: DataTypes.STRING, allowNull: false },
        enable: { type: DataTypes.BOOLEAN, defaultValue: false },
        emailSubject: { type: DataTypes.STRING, allowNull: true },
        emailContent: { type: DataTypes.STRING, allowNull: true },
    };
    return sequelize.define("Alert", attributes);
}
