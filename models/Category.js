import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";

class Category extends Model {}

const model = Category.init({
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
}, {
    sequelize: db,
    tableName: 'categories'
})

model.belongsTo(Shop, { as: 'Shop' })

export default model