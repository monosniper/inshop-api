import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Review extends Model {}

const model = Review.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author_name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    author_url: {
        type: DataTypes.STRING(2048),
    },
    content: {
        type: DataTypes.TEXT,
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5,
    },
    date: {
        type: DataTypes.DATE,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'reviews',
    timestamps: true,
    underscored: true
})

export default model