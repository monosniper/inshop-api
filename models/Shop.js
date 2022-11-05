import {DataTypes, Model} from "sequelize";
import db from "../db";
import User from "./User";
import Domain from "./Domain";
import {withUuid} from "../utils/withUuid";

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
    },
    options: {
        type: DataTypes.JSON,
        defaultValue: {}
    }
}, {
    sequelize: db,
    tableName: 'shops'
})

Shop = withUuid(Shop)

model.belongsTo(User, { as: 'User', foreignKey: 'userId' })
model.belongsTo(Domain, { as: 'Domain', foreignKey: 'domainId' })

export default model