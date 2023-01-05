import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Basket extends Model {}

const model = Basket.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'baskets',
    timestamps: true,
    underscored: true
})

export default model