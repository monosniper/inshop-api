import {DataTypes, Model} from "sequelize";
import db from "../db";
import Module from "./Module";

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

model.belongsTo(Module, { as: 'Module' })
model.belongsTo(Module, { as: 'Module', foreignKey: 'dependency_id' })

export default model