import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Order extends Model {}

const model = Order.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    billId: {
        type: DataTypes.STRING,
        unique: true
    },
    payed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    shipping_data: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'orders',
    timestamps: true,
    underscored: true
})

export default model