import {DataTypes, Model} from "sequelize";
import db from "../db";

class UserBlock extends Model {}

const model = UserBlock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    sequelize: db,
    tableName: 'users_blocks'
})

export default model