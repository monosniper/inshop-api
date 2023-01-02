import {DataTypes, Model} from "sequelize";
import db from "../db";

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

export default model