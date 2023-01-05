import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class UserBlock extends Model {}

const model = UserBlock.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'users_blocks',
    timestamps: true,
    underscored: true
})

export default model