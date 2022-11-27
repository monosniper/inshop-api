import {DataTypes, Model} from "sequelize";
import db from "../db";

class Module extends Model {}

const model = Module.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    description: {
        type: DataTypes.TEXT,
    },
    title: {
        type: DataTypes.STRING(255),
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db,
    tableName: 'modules'
})

export default model