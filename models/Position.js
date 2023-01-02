import {DataTypes, Model, UUIDV4} from "sequelize";
import db from "../db";

class Position extends Model {}

const model = Position.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        defaultValue: UUIDV4,
        unique: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    subtitle: {
        type: DataTypes.STRING(400),
    },
    description: {
        type: DataTypes.TEXT,
    },
    price: {
        type: DataTypes.INTEGER,
    },
    discount: {
        type: DataTypes.INTEGER,
    },
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    discount_type: {
        type: DataTypes.ENUM('PERCENT', 'AMOUNT'),
    },
    inStock: {
        type: DataTypes.INTEGER,
    },
    properties: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    type: {
        type: DataTypes.ENUM('PRODUCT', 'SERVICE'),
    }
}, {
    sequelize: db,
    tableName: 'positions'
})

export default model