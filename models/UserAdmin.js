import {DataTypes, Model} from "sequelize";
import db from "../db";
import User from "./User";

class UserAdmin extends Model {}

const model = UserAdmin.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    sequelize: db,
    tableName: 'users_admins'
})

model.belongsTo(User, { as: 'User' })

export default model