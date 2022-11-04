import {DataTypes, Model} from "sequelize";
import db from "../db";
import Promocode from "./Promocode";
import Client from "./Client";

class PromocodeActivation extends Model {}

const model = PromocodeActivation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
}, {
    sequelize: db,
    tableName: 'promocode_activations'
})

model.belongsTo(Promocode, { as: 'Promocode' })
model.belongsTo(Client, { as: 'Client' })

export default model