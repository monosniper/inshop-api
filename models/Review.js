import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";

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
}, {
    sequelize: db,
    tableName: 'reviews'
})

model.belongsTo(Shop, { as: 'Shop' })

export default model