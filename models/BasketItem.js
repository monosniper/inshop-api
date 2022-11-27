import {DataTypes, Model} from "sequelize";
import db from "../db";

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

export default model