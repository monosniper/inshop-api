import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";

class Position extends Model {}

const model = Position.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
        allowNull: false,
    },
    discount: {
        type: DataTypes.INTEGER,
    },
    inStock: {
        type: DataTypes.INTEGER,
    },
    order: {
        type: DataTypes.INTEGER,
    },
    properties: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
}, {
    sequelize: db,
    tableName: 'positions'
})

model.belongsTo(Shop, { as: 'Shop' })
model.belongsTo(Category, { as: 'Category' })

export default model