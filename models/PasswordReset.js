import {DataTypes, DATE, Model} from "sequelize";
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
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'password_resets',
    timestamps: true,
    underscored: true
})

export default model