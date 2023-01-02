import {DataTypes, Model} from "sequelize";
import db from "../db";

class Basket extends Model {}

const model = Basket.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    sequelize: db,
    tableName: 'baskets'
})

export default model