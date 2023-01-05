import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Color extends Model {}

const model = Color.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
    },
    description: {
        type: DataTypes.TEXT,
    },
    default_value: {
        type: DataTypes.STRING(255),
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'colors',
    timestamps: true,
    underscored: true
})

export default model