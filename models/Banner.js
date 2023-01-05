import {DataTypes, Model, DATE, UUIDV4} from "sequelize";
import db from "../db";

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
        defaultValue: UUIDV4,
        unique: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'banners',
    timestamps: true,
    underscored: true
})

export default model