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
        expiresIn: "15min",
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
        let userId, email, firstName, lastName, tags;
        let ud = jwt.decode(token, { complete: true });
        if (ud != null) {
            try {
                userId = ud.payload.userId;
                email = ud.payload.email;
                firstName = ud.payload.firstName;
                lastName = ud.payload.lastName;
                tags = ud.payload.tags;
            } catch (e) {
                console.log(e.message);
            }
            return _createToken(userId, email, firstName, lastName, tags);
        }
        return null;
    },
};
