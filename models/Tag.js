import {DataTypes, DATE, Model, UUIDV4} from "sequelize";
import db from "../db";

class Tag extends Model {}

const model = Tag.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        defaultValue: UUIDV4,
        unique: true,
    },
    title: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(255),
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'tags',
    timestamps: true,
    underscored: true
})

export default model