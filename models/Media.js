import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Media extends Model {}

const model = Media.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    model_id: {
        type: DataTypes.INTEGER,
    },
    model_type: {
        type: DataTypes.STRING(255),
    },
    filename: {
        type: DataTypes.STRING(255),
    },
    name: {
        type: DataTypes.STRING(255),
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'media',
    timestamps: true,
    underscored: true
})

export default model