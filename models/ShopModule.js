import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";
import Module from "./Module";

class ShopModule extends Model {}

const model = ShopModule.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
}, {
    sequelize: db,
    tableName: 'shop_modules'
})

model.belongsTo(Shop, { as: 'Shop' })
model.belongsTo(Module, { as: 'Module' })

export default model