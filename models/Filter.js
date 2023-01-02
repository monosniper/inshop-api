import {DataTypes, Model} from "sequelize";
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
}, {
    sequelize: db,
    tableName: 'filters'
})

export default model