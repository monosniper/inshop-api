import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class Promocode extends Model {}

const model = Promocode.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    limit: {
        type: DataTypes.INTEGER,
    },
    infinite: {
        type: DataTypes.BOOLEAN,
        allowNull: true
    },
    type: {
        type: DataTypes.ENUM,
        values: [
            'percent',
            'sum',
        ]
    },
    actual_until: {
        type: DataTypes.DATE,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'promocodes',
    timestamps: true,
    underscored: true
})

export default model