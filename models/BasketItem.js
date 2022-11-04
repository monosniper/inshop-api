import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";
import Position from "./Position";

class BasketItem extends Model {}

const model = BasketItem.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    count: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
    },
}, {
    sequelize: db,
    tableName: 'basket_items'
})

model.belongsTo(Shop, { as: 'Basket' })
model.belongsTo(Position, { as: 'Position' })

export default model