import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Feedback extends Model {}

const model = Feedback.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    theme: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    answer: {
        type: DataTypes.TEXT,
    },
    answeredAt: {
        type: DataTypes.DATE,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'feedbacks',
    timestamps: true,
    underscored: true
})

export default model