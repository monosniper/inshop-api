import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class PromocodeActivation extends Model {}

const model = PromocodeActivation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'promocode_activations',
    timestamps: true,
    underscored: true
})

export default model