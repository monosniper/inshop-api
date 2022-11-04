import {DataTypes, Model} from "sequelize";
import db from "../db";
import Shop from "./Shop";
import {hashPassword} from "../utils/hashPassword";

class Client extends Model {}

const model = Client.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fio: {
        type: DataTypes.STRING,
    },
    age: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
}, {
    sequelize: db,
    tableName: 'clients'
})

Client = hashPassword(Client)

model.belongsTo(Shop, { as: 'Shop' })

export default model