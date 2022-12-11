import {DataTypes, Model} from "sequelize";
import db from "../db";
import {hashPassword} from "../utils/hashPassword";

class User extends Model {}

const model = User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING(255),
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
    },
    rememberToken: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: 'TIMESTAMP',
        field: 'created_at'
    },
    updated_at: {
        type: 'TIMESTAMP',
        field: 'updated_at'
    }
}, {
    sequelize: db,
    tableName: 'users',
})

User = hashPassword(User)

export default model