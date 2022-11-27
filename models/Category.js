import {DataTypes, Model, UUIDV4} from "sequelize";
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
}, {
    sequelize: db,
    tableName: 'categories'
})

export default model