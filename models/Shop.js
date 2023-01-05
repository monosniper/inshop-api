import {DataTypes, DATE, Model, UUIDV4} from "sequelize";
import db from "../db";

class Shop extends Model {}

const model = Shop.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        unique: true,
        defaultValue: UUIDV4,
    },
    options: {
        type: DataTypes.JSON,
        defaultValue: {}
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'shops',
    timestamps: true,
    underscored: true
})

export default model