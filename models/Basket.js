import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";
import Client from "./Client";

class Basket extends Model {}

const model = Basket.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    sequelize: db,
    tableName: 'baskets'
})

model.belongsTo(Shop, { as: 'Shop' })
model.belongsTo(Client, { as: 'Client' })

export default model