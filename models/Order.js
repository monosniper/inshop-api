import {DataTypes, Model} from "sequelize";
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
}, {
    sequelize: db,
    tableName: 'orders'
})

export default model