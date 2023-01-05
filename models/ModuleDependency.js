import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class ModuleDependency extends Model {}

const model = ModuleDependency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'module_dependencies',
    timestamps: true,
    underscored: true
})

export default model