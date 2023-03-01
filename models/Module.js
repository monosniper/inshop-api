import {DataTypes, DATE, Model, UUIDV4} from "sequelize";
import db from "../db";

class Module extends Model {}

const model = Module.init({
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
    price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    default_options: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    description: DataTypes.TEXT,
    title: DataTypes.STRING(255),
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'modules',
    timestamps: true,
    underscored: true
})

export default model