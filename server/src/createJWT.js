const jwt = require("jsonwebtoken");
require("dotenv").config();
const _createToken = (userId, email, firstName, lastName, tags) => {
    const user = {
        userId: userId,
        email: email,
        firstName: firstName,
        lastName: lastName,
        tags: tags,
    };
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "30m",
    });
};

module.exports = {
    createToken: (userId, email, firstName, lastName, tags) => {
        return _createToken(userId, email, firstName, lastName, tags);
    },

    isExpired: (token) => {
        var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verified) => {
            if (err) return true;
            else return false;
        });
        return isError;
    },
    refresh: (token) => {
        let ud = jwt.decode(token, { complete: true });
        let userId = ud.payload.userId;
        let email = ud.payload.email;
        let firstName = ud.payload.firstName;
        let lastName = ud.payload.lastName;
        let tags = ud.payload.tags;

        return _createToken(userId, email, firstName, lastName, tags);
    },
};
