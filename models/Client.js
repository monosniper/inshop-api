import {DataTypes, Model, UUIDV4} from "sequelize";
import db from "../db";

class Client extends Model {}

const model = Client.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    uuid: {
        type: DataTypes.STRING(255),
        defaultValue: UUIDV4,
        unique: true,
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

export default model