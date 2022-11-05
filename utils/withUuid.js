import { v4 as uuidv4 } from 'uuid';

export const withUuid = (model) => {
    model.beforeCreate((instance, options) => {
        instance.uuid = uuidv4();
    });

    return model
}