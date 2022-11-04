import {DataTypes, Model} from "sequelize";
import db from "../db";

class PasswordReset extends Model {}

const model = PasswordReset.init({
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: db,
    tableName: 'password_resets'
})

export default model