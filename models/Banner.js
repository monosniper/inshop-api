import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";

class Banner extends Model {}

const model = Banner.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    priority: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    type: {
        type: DataTypes.ENUM,
        values: [
            'text',
            'text_button',
            'text_button_image',
            'text_image',
            'image',
        ]
    },
    title: {
        type: DataTypes.STRING(100),
    },
    text: {
        type: DataTypes.STRING(400),
    },
    background: {
        type: DataTypes.STRING,
    },
    color: {
        type: DataTypes.STRING,
    },
    button_text: {
        type: DataTypes.STRING,
    },
    button_link: {
        type: DataTypes.STRING(2048),
    },
    button_background: {
        type: DataTypes.STRING,
    },
    button_color: {
        type: DataTypes.STRING,
    },
    uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db,
    tableName: 'banners'
})

model.belongsTo(Shop, { as: 'Shop' })

export default model