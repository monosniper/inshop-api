import {DataTypes, DATE, Model} from "sequelize";
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
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'basket_items',
    timestamps: true,
    underscored: true
})

export default model