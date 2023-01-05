import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

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
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'domains',
    timestamps: true,
    underscored: true
})

export default model