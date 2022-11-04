import {DataTypes, Model} from "sequelize";
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
    }
}, {
    sequelize: db,
    tableName: 'feedbacks'
})

export default model