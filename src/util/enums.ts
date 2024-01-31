import { DataTypes } from "sequelize";

export const TestProductionDataType = DataTypes.ENUM('test', 'production')

export const ActiveInactiveDataType = DataTypes.ENUM('active', 'inactive')

export const OnOffDataType = DataTypes.ENUM('on', 'off')

export const LessGreaterThan = DataTypes.ENUM('lessThan', 'greaterThan')

export const ticketStatus = DataTypes.ENUM('open', 'inProcess', 'closed')

export const priority = DataTypes.ENUM('high', 'low')