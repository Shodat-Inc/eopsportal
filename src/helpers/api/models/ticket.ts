import { DataTypes } from "sequelize";
import { ticketStatus } from "@/util/enums"

export function Ticket(sequelize: any) {
    const attributes = {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },

        status: {
            type: ticketStatus,
            defaultValue: 'inProcess'
        },

        assignTo: {
            type: DataTypes.STRING,
            allowNull: false
        },

    };

    return sequelize.define("Ticket", attributes);
}
