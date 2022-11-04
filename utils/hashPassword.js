import bcrypt from "bcrypt";

export const hashPassword = (model) => {
    model.beforeCreate((user, options) => {
        return cryptPassword(user.password)
            .then(success => {
                user.password = success;
            })
            .catch(err => {
                if (err) console.log(err);
            });
    });

    function cryptPassword(password) {
        console.log("cryptPassword" + password);
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(10, function(err, salt) {
                // Encrypt password using bcrypt module
                if (err) return reject(err);

                bcrypt.hash(password, salt, null, function(err, hash) {
                    if (err) return reject(err);
                    return resolve(hash);
                });
            });
        })
    }

    return model
}