import {DataTypes, Model} from "sequelize";
import db from "../db";
import User from "./User";

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

model.belongsTo(User, { as: 'User' })

export default model