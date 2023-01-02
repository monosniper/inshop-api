import {DataTypes, Model} from "sequelize";
import db from "../db";

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

export default model