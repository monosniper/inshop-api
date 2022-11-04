import {DataTypes, Model} from "sequelize";
import db from "../db";
import User from "./User";

class Domain extends Model {}

const model = Domain.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    isSubdomain: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: db,
    tableName: 'domains'
})

model.belongsTo(User, { as: 'User' })

export default model