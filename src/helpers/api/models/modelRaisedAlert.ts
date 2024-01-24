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

        modelDataId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    };

    return sequelize.define("RaisedAlert", attributes);
}
