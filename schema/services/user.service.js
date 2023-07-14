import User from "../../models/User";
import {hashPassword} from "../../utils/hashPassword";

export const getUsers = async () => {
    return await User.findAll();
}

export const getUser = async (id) => {
    return await User.findOne({ where: { id: Number(id) } })
}

export const createUser = async (input) => {
    input.password = await hashPassword(input.password)

    const user = new User({
        ...input
    })

    return await user.save();
}