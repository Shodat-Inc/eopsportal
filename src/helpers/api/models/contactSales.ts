import { DataTypes } from "sequelize";

export function ContactSales(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        email: {
            type: DataTypes.INTEGER,
        },
        message: {
            type: DataTypes.STRING,
        },
        firstName: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        companyname: {
            type: DataTypes.STRING,
        },
        CIN: {
            type: DataTypes.STRING,
        },
        numOfEmployee: {
            type: DataTypes.INTEGER,
        },
        phoneNumber: {
            type: DataTypes.STRING,
        }
    }
    return sequelize.define("ContactSale", attributes);
}