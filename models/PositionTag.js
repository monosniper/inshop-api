import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class PositionTag extends Model {}

const model = PositionTag.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'position_tags',
    timestamps: true,
    underscored: true
})

export default model