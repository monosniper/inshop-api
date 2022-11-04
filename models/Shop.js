import {DataTypes, Model} from "sequelize";
import db from "../db";
import User from "./User";
import Domain from "./Domain";

class Shop extends Model {}

const model = Shop.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    options: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    sequelize: db,
    tableName: 'shops'
})

model.belongsTo(User, { as: 'User' })
model.belongsTo(Domain, { as: 'Domain' })

export default model