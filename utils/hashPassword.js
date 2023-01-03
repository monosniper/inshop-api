import bcrypt from "bcrypt";

export const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            // Encrypt password using bcrypt module
            if (err) return reject(err);

            bcrypt.hash(password, salt, function(err, hash) {
                if (err) return reject(err);
                return resolve(hash);
            });
        });
    })
}