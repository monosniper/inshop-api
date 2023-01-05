import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class UserAdmin extends Model {}

const model = UserAdmin.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'users_admins',
    timestamps: true,
    underscored: true
})

export default model