import {DataTypes, Model, UUIDV4} from "sequelize";
import db from "../db";

class Shop extends Model {}

const model = Shop.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        unique: true,
        defaultValue: UUIDV4,
    },
    options: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    sequelize: db,
    tableName: 'shops'
})

export default model