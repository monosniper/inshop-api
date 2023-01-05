import {DataTypes, DATE, Model} from "sequelize";
import db from "../db";

class SocialNetwork extends Model {}

const model = SocialNetwork.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    slug: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    createdAt: { type: DATE, field: 'created_at' },
    updatedAt: { type: DATE, field: 'updated_at' },
}, {
    sequelize: db,
    tableName: 'social_networks',
    timestamps: true,
    underscored: true
})

export default model