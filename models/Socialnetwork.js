import {DataTypes, Model} from "sequelize";
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
}, {
    sequelize: db,
    tableName: 'social_networks'
})

export default model