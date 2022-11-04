import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";
import Socialnetwork from "./Socialnetwork";

class ShopSocialnetwork extends Model {}

const model = ShopSocialnetwork.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    value: {
        type: DataTypes.STRING(2048),
    },
}, {
    sequelize: db,
    tableName: 'shop_social_networks'
})

model.belongsTo(Shop, { as: 'Shop' })
model.belongsTo(Socialnetwork, { as: 'Socialnetwork' })

export default model