import {DataTypes, Model} from "sequelize";
import db from "../db";

class ModuleDependency extends Model {}

const model = ModuleDependency.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    sequelize: db,
    tableName: 'module_dependencies'
})

export default model