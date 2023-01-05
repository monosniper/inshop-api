import {DataTypes, DATE, Model, UUIDV4} from "sequelize";
import db from "../db";

class Category extends Model {}

const model = Category.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        defaultValue: UUIDV4,
        unique: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'categories',
    timestamps: true,
    underscored: true
})

export default model