import { DataTypes } from "sequelize";
import { LessGreaterThan } from "@/util/enums";

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
        rangeValue: {
            type: LessGreaterThan,
            defaultValue: 'lessThan',
        },
        thresholdValue: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isEnabled: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        receiverEmailAddresses: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    };

    return sequelize.define("Alert", attributes);
}
