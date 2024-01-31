import { DataTypes } from "sequelize";

export function EmailTemplate(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        emailSubject: { type: DataTypes.STRING, allowNull: true },
        emailContent: { type: DataTypes.STRING, allowNull: true },
    };
    return sequelize.define("EmailTemplate", attributes);
}
