import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";

class Custompage extends Model {}

const model = Custompage.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.STRING(2048),
    },
    content: {
        type: DataTypes.TEXT,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db,
    tableName: 'custom_pages'
})

model.belongsTo(Shop, { as: 'Shop' })

export default model