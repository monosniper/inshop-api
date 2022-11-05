import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";
import Position from "./Position";

class Module extends Model {}

const model = Module.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.TEXT,
    },
    title: {
        type: DataTypes.STRING(255),
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db,
    tableName: 'modules'
})

model.belongsTo(Shop, { as: 'Basket' })
model.belongsTo(Position, { as: 'Position' })

export default model