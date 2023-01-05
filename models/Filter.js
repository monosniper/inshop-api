import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Filter extends Model {}

const model = Filter.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slug: {
        type: DataTypes.STRING(255),
        unique: true,
    },
    title: {
        type: DataTypes.STRING,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'filters',
    timestamps: true,
    underscored: true
})

export default model