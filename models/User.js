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
        allowNull: false,
        unique: true
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
}, {
    sequelize: db,
    tableName: 'users',
})

User = hashPassword(User)

export default model